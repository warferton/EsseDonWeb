import { MongoClient, Collection } from "mongodb";
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import config from '../config/server-config';
import { signJWT } from "util/jwt-util";
import { IUser } from "types/user.type";

let AdminUsers : Collection;

export default class AuthDao {

    static async injectDB(connection : MongoClient){
        if( AdminUsers )
            return;

        try{
            if( !AdminUsers )
                AdminUsers = await connection.db(config.dataBases.users).collection('admin_users');

        }catch( err ){
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
        ).catch(err => {
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
                    (error, token) => {
                        if (error) {
                            throw error;
                        }
                        else if (token) {
                            console.log("Successfully signed and returned token");
                            res.status(200).json({
                                message: "Successful Authentication",
                                username: username,
                                token: `Bearer ${token}`
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

        return { message: 'Token was successfully validated'};
    }

    static async register( req: Request ) {
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

    }

}
