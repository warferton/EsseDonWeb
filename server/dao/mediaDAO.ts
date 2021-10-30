import config from "../config/server-config";
import EventDao from '../dao/eventDAO';
import { Collection, MongoClient, ObjectId } from "mongodb";
import { NextFunction, Request, Response } from 'express';
import { ImageFile } from "../types/misc.types";
import { toUploadableImage, inferImageFileType } from "../util/compress-utils";
import { IEvent } from "../types/event.type";

let Photos : Collection;

export default class MediaDao {

    static async injectDB(connection : MongoClient){
        if( Photos )
            return;
        try {
            if( !Photos )
                Photos = await connection.db(config.dataBases.media).collection('pictures');
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to retrieve data from the database: ${ err.message }`
            );
        }
    }

    static async uploadMedia(req: Request, res : Response, next: NextFunction) {
        try {
            const mediafiles = req.files as any;
            const imageFile = mediafiles.media as ImageFile;
            const uploadable = await toUploadableImage(imageFile);
            const insertResult = await Photos.insertOne(uploadable);
            res.locals['mediaId'] = insertResult.ops[0]._id;
            next();
        } catch(error : any) {
            const err = new Error(error);
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
    
    static async getMediaFile( imageParams : any) {
        const id = imageParams.mediaId;
        try {
            let cursor;
            cursor = await Photos.findOne(
                { _id : new ObjectId(id) }
            );
            
            return {
                image: cursor
            }
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return { 
                message: err.message 
            };
        }
    }

    static async updateEventMediaHandler(req: Request, res : Response, next: NextFunction) {
        let cursor;
        try {
            //check if id only
            console.log('Checking if just an imageId...');
            if(req.body.media) {
                const image = req.body.media;
                if(image.length > 0) {
                    console.log(`Recieved imageId instead of a file | ImageId: ${ image }`);
                    cursor = await Photos.findOne({
                        _id: new ObjectId(image)
                    });
                    if (cursor) {
                        console.log("Image is already in the DB, passing through the imageId...");
                        res.locals['mediaId'] = image;
                        next();
                        return;
                    } else {
                        throw new Error("Unpredictable error has occured! Image has Id but is not found in databasee!")
                    }
                }
            }
            console.log('Looks like we got a file...');
            //get file
            const mediafiles = req.files as any;
            const image = inferImageFileType(mediafiles.media);
            //check if exists
            if(image._id) {
                //exists -> pass through
                console.log(`ImageId Found = ${image._id}`);
                cursor = await Photos.findOne({
                    _id: new ObjectId(image._id)
                });
                if (cursor) {
                    console.log("Image is already in the DB, passing through the imageId...");
                    res.locals['mediaId'] = image._id;
                    next();
                    return;
                } else {
                    throw new Error("Unpredictable error has occured! Image has Id but is not found in databasee!")
                }
            } else {
                //doesent exist -> delete old img
                const eventId = req.body._id as string;
                const eventData = (await EventDao.getEventById(eventId)).event as IEvent;
                const oldImageId = eventData.image as string;
                cursor = await Photos.deleteOne({ _id: new ObjectId(oldImageId) });
                if(cursor.deletedCount as number > 0) {
                    console.log("Deleted a previously assigned event image");
                } else {
                    console.warn("No entries were deleted. Probably smth went wrong!");
                }
                const uploadable = await toUploadableImage(image as ImageFile);
                const insertResult = await Photos.insertOne(uploadable);
                console.log(`New Image Inserted: Count: ${insertResult.insertedCount}, ID: ${insertResult.ops[0]._id}`);
                res.locals['mediaId'] = insertResult.ops[0]._id;
                next();
                return;
            }
        } catch (error : any) {
            const err = new Error(error);
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }

}
