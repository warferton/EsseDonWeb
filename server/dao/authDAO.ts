import { MongoClient, ObjectId, Collection } from "mongodb";
import jwt from 'njwt';

let AdminUsers : Collection;

export default class AuthDao {

    static async injectDB(connection : MongoClient){
        if( AdminUsers )
            return;

        try{
            if( !AdminUsers )
                AdminUsers = await connection.db(process.env['USERS_NS']).collection('admin_users');

        }catch( err ){
            console.error(
                `Unable to retrieve data from the database: ${ err.message }`
            );
        }
    }

    static async login( username: string, password: string ) {
        let cursor;
        
        //find user and check passwords
        try {
            cursor = await AdminUsers.findOne(
                { username : new ObjectId( username ) }
            );
        }catch( err ){
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
        }

        const { usernameFromDb, passwordFromDb } = cursor;

        if(passwordFromDb !== password) {
            const ERROR = new Error("Password is Invalid");
            console.log(ERROR);
            throw ERROR;
        }
        
        //generate jwt
        const payload = { iss: 'jazzesse', sub: usernameFromDb }
        const token = jwt.create(payload, process.env['JWT_SECRET'])
        token.setExpiration(new Date().getTime() + 90*10000) //15 min

        return { 
            username: usernameFromDb, 
            token: token 
        }
    }

    static async logout( req : any ) {

    }


}