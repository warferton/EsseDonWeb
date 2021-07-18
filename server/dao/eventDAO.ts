import { MongoClient, ObjectId, Collection } from "mongodb";
import { IEvent } from '../types/event.type';
import { v4 as uuid } from 'uuid';

interface IQuery extends Object{
    price?: number;
    title?: string;
    description?: string;
    free?: boolean;
    id?: string;
    lineup?: string[];
    date?: string;
    time?: string;

}

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

    static async getActiveEvents( filters: IQuery, eventPerLoad?: number ) {
        const loadLimit = eventPerLoad || 20;
        let query : IQuery  = {};
        if( filters ){
            query = Object.assign(query, filters);
            if(query.free){
                query.free = `${query.free}` === 'true' ? true : false;
            }
            if(query.price){
                query.price = new Number(query.price).valueOf();
            }
        }
        
        let cursor;

        try {
            cursor = await ActiveEvents.find(query);
        }catch( err ){
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {events: [], totalRetrieved: 0};
        }

        const displayCursor = cursor.limit(loadLimit);

        try{

            const events = await displayCursor.toArray();

            const totalActiveEvents = await ActiveEvents.countDocuments(query);

            return {events, totalActiveEvents};
        }catch( err ){
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {events: [], totalRetrieved: 0, limit: loadLimit};
        }
    }

    static async getArchivedEvents( filters: IQuery, eventPerLoad?: number ) {
        const loadLimit = eventPerLoad || 20;
        let query : IQuery  = {};
        if( filters ){
            query = Object.assign(query, filters);
            if(query.free){
                query.free = `${query.free}` === 'true' ? true : false;
            }
            if(query.price){
                query.price = new Number(query.price).valueOf();
            }
        }
        
        let cursor;

        try {
            cursor = await ArchivedEvents.find(query);
        }catch( err ){
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {events: [], totalRetrieved: 0};
        }

        const displayCursor = cursor.limit(loadLimit);

        try{

            const events = await displayCursor.toArray();

            const totalActiveEvents = await ArchivedEvents.countDocuments(query);

            return {events, totalActiveEvents};
        }catch( err ){
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {events: [], totalRetrieved: 0, limit: loadLimit};
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