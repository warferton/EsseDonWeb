import { MongoClient, Collection, ObjectId } from "mongodb";
import { IEvent } from '../types/event.type';
import config from '../config/server-config';
import { parseLineup } from "../util/parsing-utils";


interface IQuery extends Object{
    price?: number;
    title?: string;
    description?: string;
    shortdescription?: string;
    free?: boolean;
    deposit?: number;
    id?: string;
    lineup?: string[];
    date?: string;
    time?: string;
    active?: boolean;
}

let ActiveEvents : Collection;
let ArchivedEvents : Collection;

export default class EventDbClient{
    
    static async injectDB(connection : MongoClient){
        if( ActiveEvents && ArchivedEvents )
            return;

        try{
            if( !ActiveEvents )
                ActiveEvents = await connection.db(config.dataBases.events).collection('active_events');
            if( !ArchivedEvents )
                ArchivedEvents = await connection.db(config.dataBases.events).collection('archived_events');

        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to retrieve data from the database: ${ err.message }`
            );
        }
    }


    static async getEventById( id: string ) {
        let cursor;
        
        try {
            cursor = await ActiveEvents.findOne(
                { _id : new ObjectId(id) }
            );
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return { events: [], totalRetrieved: 0 };
        }

        /**
         * @todo Refactor
         */
        try{
            return { event : cursor };
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return { events: [] };
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
        } catch(error : any) {
            const err = new Error(error);
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
        } catch(error : any) {
            const err = new Error(error);
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
        } catch(error : any) {
            const err = new Error(error);
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
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );

            return {events: [], totalRetrieved: 0, limit: loadLimit};
        }
    }

    /**
     * @status READY
     */
    static async createEvent(event: IEvent){
        const { active } = event;
        const bandArray = parseLineup(event.lineup?.toString() as string);
        event.lineup = bandArray;
        return active ? this.createActiveEvent(event) : this.createArchivedEvent(event);
    }

    /**
     * @status READY
     */
    static async updateEvent(event: IEvent){
        const { active } = event;
        const collectionToDeleteFrom = active ? ArchivedEvents : ActiveEvents;
        console.log('EventId ==> ' + event._id);
        console.log(collectionToDeleteFrom.collectionName);
        const documentFound = await collectionToDeleteFrom.findOne( { _id:  new ObjectId(event._id) } );
        console.log('DocumentFound ==> ' + Object.entries(documentFound));
        if( documentFound ){
            const deleteRes = collectionToDeleteFrom.deleteOne( { _id:  new ObjectId(event._id) } );
            console.log('DeleteRes==> ' + (await deleteRes).result);
            return active ? this.createActiveEvent(event) : this.createArchivedEvent(event);
        }
        return active ? this.updateActiveEvent(event) : this.updateArchivedEvent(event);
    }


    /**
     * @status READY
     */
    static async deleteEvent(event: IEvent){
        const { _id, active } = event;
        return active ? this.deleteActiveEvent(_id) : this.deleteArchvedEvent(_id);
    }

    /**
     * @status READY
     */
    static async createArchivedEvent(event: IEvent){
        const { _id, ...insertBody } = event;
        try{
            return await ArchivedEvents.insertOne( insertBody );
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to insert a new document: ${err.message}`
            );
            throw err;
        }
    };
    
    
    /**
     * @status READY
     */
    static async createActiveEvent(event: IEvent){
        const { _id, ...insertBody } = event;
        try{
            return await ActiveEvents.insertOne( insertBody );
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to insert a new document: ${err.message}`
            );
            throw err;
        }
    };

    /**
     * @status READY
     */
    static async updateArchivedEvent(event : IEvent){
        const {_id, ...updateBody} =  event;
         try{
            return await ArchivedEvents.updateOne( 
                { _id : new ObjectId(_id) },
                { $set :  updateBody } 
            );
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to update a document: ${err.message}`
            );
            throw err;
        }
    };  

    /**
     * @status READY
     */
    static async updateActiveEvent(event : IEvent){
       const {_id, ...updateBody} =  event;
         try{
            return await ActiveEvents.updateOne( 
                { _id : new ObjectId(_id) },
                { $set :  updateBody } 
            );
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to update a document: ${err.message}`
            );
            throw err;
        }
    };

    /**
     * @status READY
     */
    static async updateActiveEventGroup(events : IEvent[]){
        const result = [];
         try{
            for(let i = 0; i < events.length; i++) {
                const { _id, ...updateBody } = events[i] as IEvent;
                result.push( await ActiveEvents.updateOne( 
                    { _id : new ObjectId(_id) },
                    { $set :  updateBody } 
                ));
            }
            return result;
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to update a document: ${err.message}`
            );
            throw err;
        }
    };
    
    
    /** 
     * @status READY
     */
    static async deleteArchvedEvent( id  : string ){
        const filter = { _id : new ObjectId(id) };
        try{
            return await ArchivedEvents.deleteOne( filter );
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to delete a document: ${err.message}`
                );
            throw err;
            }
        };

  
    /** 
     * @status READY
     */
    static async deleteActiveEvent( id  : string ){
        const filter = { _id : new ObjectId(id) };
        try{
            return await ArchivedEvents.deleteOne( filter );
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to delete a document: ${err.message}`
            );
            throw err;
        }
    };

    /** 
     * @status READY
     */
    static async switchEventsDb( events: IEvent[] ){
        if(events === null || events.length <= 0){
            throw new Error("Invalid Input : parameter is empty");
        }
        const res = [];
        try {
            for(const event of events){
                res.push( await this.updateEvent( event ) );
            }
        } catch(error : any) {
            throw new Error( error );
        }
        return res;
    }
}
