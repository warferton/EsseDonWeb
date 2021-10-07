import config from "config/server-config";
import { Collection, MongoClient, ObjectId } from "mongodb";
import { NextFunction, Request, Response } from 'express';

let Photos : Collection;

export default class MediaDao {

    static async injectDB(connection : MongoClient){
        if( Photos )
            return;
        try {
            if( !Photos )
                Photos = await connection.db(config.dataBases.media).collection('pictures');
        } catch( err ){
            console.error(
                `Unable to retrieve data from the database: ${ err.message }`
            );
        }
    }

    static async uploadMedia(req: Request, res : Response, next: NextFunction) {
        try {
            const mediafile = req.files as any;
            const fileName = `${new Date().toISOString()}-jazz-${mediafile.media.name}`;
            mediafile.media.name = fileName;
            const insertResultId = await Photos.insertOne(mediafile.media);
            res.locals['mediaId'] = insertResultId.ops[0]._id;
            next();
        } catch( err ){
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
        } catch (err) {
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return { 
                message: err.message 
            };
        }
    }

}
