import { MongoClient, Collection, ObjectId } from 'mongodb';
import { EventStatus, IEvent } from '../types/event.type';
import config from '../config/server-config';
import { parseLineup, parseDescription } from "../util/parsing-utils";


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
        let cursor : IEvent;
        
        try {
            cursor = await ActiveEvents.findOne(
                { _id : new ObjectId(id) }
            );
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return { event: null, totalRetrieved: 0 };
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
            return { event: null };
        }
    }

    static async getActiveEvents( filters: IQuery, offset: number = 0, limit: number = 70) {
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
            cursor = ActiveEvents.find(query)
            .sort('date', 1)
            .skip(new Number(offset).valueOf())
            .limit(new Number(limit).valueOf())
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {events: [], totalRetrieved: 0};
        }

        const displayCursor = cursor

        try{

            const events = await displayCursor.toArray();

            const totalActiveEvents = await ActiveEvents.countDocuments();

            return {events, totalActiveEvents};
        } catch(error : any) {
            const err = new Error(error);
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {events: [], totalRetrieved: 0, limit};
        }
    }

    static async getArchivedEvents( filters: IQuery, eventPerLoad?: number ) {
        const loadLimit = eventPerLoad || 70;
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
            cursor = ArchivedEvents.find(query);
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
        const fixedDescription = parseDescription(event.description?.toString() as string);
        event.lineup = bandArray;
        event.description = fixedDescription;
        return active ? EventDbClient.createActiveEvent(event) : EventDbClient.createArchivedEvent(event);
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
        console.log('DocumentFound ==> ' + documentFound);
        if( documentFound ){
            const deleteRes = collectionToDeleteFrom.deleteOne( { _id:  new ObjectId(event._id) } );
            console.log('DeleteRes==> ' + (await deleteRes).result);
            EventDbClient.createEvent(event);
        }
        const bandArray = parseLineup(event.lineup?.toString() as string);
        const fixedDescription = parseDescription(event.description?.toString() as string);
        event.lineup = bandArray;
        event.description = fixedDescription;
        active ? EventDbClient.updateActiveEvent(event) : EventDbClient.updateArchivedEvent(event);
    }


    /**
     * @status READY
     */
    static async deleteEvents(eventIds: string[]){
        console.log("Recieved ID's for deletion");
        console.log(eventIds);
        const results = [];
        for(const id of eventIds) {
            const res = this.deleteArchvedEvent(id);
            results.push(res);
        }
        console.log(results);
        return results;
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
        try{
            return await ArchivedEvents.deleteOne( { _id : new ObjectId(id) } );
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
        try{
            return await ActiveEvents.deleteOne( { _id : new ObjectId(id) } );
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
    static async switchEventsDb( eventIds: string[] ){
        if(eventIds === null || eventIds.length <= 0){
            throw new Error("Invalid Input : eventIds array is empty");
        }

        for(const eventId of eventIds){
            EventDbClient.getEventById(eventId)
            .then(res => {
                const { event } = res;
                if (event === null) return Promise.reject(`Event ${eventId} doesen't exist`);
                event.active = !event.active
                return event;
            })
            .then(EventDbClient.updateEvent)
        }
    }

    static async getEventPropertyById(eventIds: string[], fieldName: string, eventStatus: EventStatus) : Promise<any> {
        const objectIds = eventIds.map(eventId => new ObjectId(eventId));
        const query = { _id: { $in: objectIds }}

        const accessedCollection = eventStatus === EventStatus.active ? ActiveEvents : ArchivedEvents
        return accessedCollection.find(query, {projection: {[`${fieldName}`]: 1}}).toArray();
    }

}
