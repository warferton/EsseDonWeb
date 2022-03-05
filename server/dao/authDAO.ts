import { MongoClient, Collection, ObjectId } from "mongodb";
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import config from '../config/server-config';
import { signJWT } from "../util/jwt-util";
import { IUser } from "../types/user.type";

let AdminUsers : Collection;

export default class AuthDao {

    static async injectDB(connection : MongoClient){
        if( AdminUsers )
            return;

        try{
            if( !AdminUsers )
                AdminUsers = await connection.db(config.dataBases.users).collection('admin_users');

        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to retrieve data from the database: ${ err.message }`
            );
        }
    }

    static async login( req: Request, res: Response ) {
        const { username, password } = req.body;

        let cursor: IUser;
        
        //find user and check passwords
        cursor = await AdminUsers.findOne(
            { username :  username }
        ).catch(error => {
            const err = new Error(error);
            console.error(`Unable to issue "find" command: ${ err.message }`);
        });
        
        if( !cursor ){
            const error = new Error("Unable to find user");
            console.error(error.stack);
            res.status(400).json( {message: "Wrong username or password"});
        }
        else {
            console.log('User found');
        

            const { password: passwordFromDb } = cursor;

            const compareResult = bcryptjs.compareSync(password, passwordFromDb);
            if( compareResult ) {
                //generate jwt
                signJWT(
                    cursor,
                    async (error, token) => {
                        if (error) {
                            throw error;
                        }
                        else if (token) {
                            console.log("Successfully signed the token");
                            try{
                                console.log('Updating lastLogin field in database');
                                await AdminUsers.findOneAndUpdate({ _id: new ObjectId(cursor._id)}, { $set: { lastLogin: new Date() }});
                            } catch(error : any) {
                                console.error('Failed to update "lastLogin" field in the database');
                            }
                            res
                            .status(200)
                            .cookie('JazzEsseDonToken', token, { expires: new Date(Date.now() +  36000000), httpOnly: true, secure: true, sameSite: 'strict' })
                            .send({
                                message: "Successful Authentication",
                                username: username,
                            });
                        }
                        else {
                            const error = new Error("Unexpected exception: Token was not retured but no error was caught");
                            console.error(error.stack);
                        }
                    })
                } 
            else {
                const error = new Error(`Password mismatch for user: ${username}`)
                console.error(error.stack);
                res.status(401).json({ message: "Wrong username or password" });
            }
        }
    }

    static async logout( req : Request ) {}

    static async validate( req: Request ) {
        console.log('Token was successfully validated');

        return { message: 'Token was successfully validated', ok: true };
    }

    /* static async register( req: Request ) {
        const { username, password } = req.body;
        return bcryptjs
        .hash(password, 10)
        .then(hash => {
            //insert new user into db
                return AdminUsers.insertOne({
                    username: username,
                    password: hash,
                    created: new Date(),
                    lastLogin: new Date()
                })
            })
        .catch( err => {
            if(err) {
                throw err;
            }
        });

	} */

}
