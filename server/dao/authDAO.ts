import { MongoClient, ObjectId, Collection } from "mongodb";
import { IUser } from 'types/user.type';

let Users : Collection;

export default class AuthDao {

    static async injectDB(connection : MongoClient){
            if( Users )
                return;

            try{
                if( !Users )
                    Users = await connection.db(process.env['USERS_NS']).collection('users');

            }catch(err){
                console.error(
                    `Unable to retrieve data from the database: ${ err.message }`
                );
            }
    }

    static async login( req : any ) {

    }

    static async logout( req : any ) {

    }


}