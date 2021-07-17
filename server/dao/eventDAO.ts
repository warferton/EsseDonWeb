import { MongoClient, ObjectId, Collection } from "mongodb";
import { IEvent } from '../types/event.type';
import { v4 as uuid } from 'uuid';

let ActiveEvents : Collection;
let ArchivedEvents : Collection;

export default class EventDbClient{
    
    static async injectDB(connection : MongoClient){
        if( ActiveEvents && ArchivedEvents )
            return;

        try{
            if( !ActiveEvents )
                ActiveEvents = await connection.db(process.env['EVENTS_NS']).collection('active_events');
            if( !ArchivedEvents )
                ArchivedEvents = await connection.db(process.env['EVENTS_NS']).collection('archived_events');

        }catch(err){
            console.error(
                `Unable to retrieve data from the database: ${ err.message }`
            );
        }
    }

    static async getActiveEvents({
        filters = {},
        eventPerLoad = 20
    } = {}) {
        let query  = {};
        if( filters ){
            query = Object.assign(filters);
        }

        console.log(query);

        let cursor;

        try {
            cursor = await ActiveEvents.find(filters);
        }catch( err ){
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {events: [], totalRetrieved: 0};
        }

        const displayCursor = cursor.limit(eventPerLoad);

        try{

            const events = await displayCursor.toArray();

            const totalActiveEvents = await ActiveEvents.countDocuments(query);

            return {events, totalActiveEvents};
        }catch( err ){
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {events: [], totalRetrieved: 0};
        }
    }

    static async getArchivedEvents({
        filters = {},
        eventPerLoad = 20
    } = {}) {
        let query  = {};
        if( filters ){
            query = Object.assign(filters);
        }

        console.log(query);

        let cursor;

        try {
            cursor = await ArchivedEvents.find(filters);
        }catch( err ){
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {events: [], totalRetrieved: 0};
        }

        const displayCursor = cursor.limit(eventPerLoad);

        try{

            const events = await displayCursor.toArray();

            const totalArchivedEvents = await ArchivedEvents.countDocuments(query);

            return {events, totalArchivedEvents};
        }catch( err ){
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {events: [], totalRetrieved: 0};
        }
    }

    /**
     * @status TESTING
     * @param param0 
     */
    static async createArchivedEvent(event: IEvent){
        const id = uuid();
        const newEventDoc = Object.assign( event, { _id: new ObjectId( id ) } );
        try{
            return await ArchivedEvents.insertOne( newEventDoc );
        }catch( err ){
            console.error(
                `Unable to insert a new document: ${err.message}`
            );
            return { error: err };
        }
    };
    
    /**
     * @status TESTING
     * @param param0 
     */
    static async createActiveEvent(event: IEvent){
        const id = uuid();
        const newEventDoc = Object.assign( event, { _id: new ObjectId( id ) } );
        try{
            return await ActiveEvents.insertOne( newEventDoc );
        }catch( err ){
            console.error(
                `Unable to insert a new document: ${err.message}`
            );
            return { error: err };
        }
    };

    /**
     * @status TESTING
     * @param param0 
     */
    static async updateArchivedEvent(event : IEvent){
        const filter = { _id : event?.id };
         try{
            return await ArchivedEvents.updateOne( filter, event );
        }catch( err ){
            console.error(
                `Unable to update a document: ${err.message}`
            );
            return { error: err };
        }
    };  

    /**
     * @status TESTING
     * @param param0 
     */
    static async updateActiveEvent(event : IEvent){
        const filter = { _id : event?.id };
        try{
            return await ActiveEvents.updateOne( filter, event );
        }catch( err ){
            console.error(
                `Unable to update a document: ${err.message}`
            );
            return { error: err };
        }
    };

    /** 
     * @status TESTING
     * @param param0 
     */
    static async deleteEvent({ id = '' } = {}){
        const filter = { _id : id };
        try{
            return await ActiveEvents.deleteOne( filter );
        }catch( err ){
            console.error(
                `Unable to delete a document: ${err.message}`
            );
            return { error: err };
        }
    };

}