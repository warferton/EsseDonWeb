import { MongoClient, ObjectId, Collection } from "mongodb";
import { IEvent } from '../types/event.type';


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
                ActiveEvents = await connection.db(process.env['EVENTS_NS']).collection('active_events');
            if( !ArchivedEvents )
                ArchivedEvents = await connection.db(process.env['EVENTS_NS']).collection('archived_events');

        }catch(err){
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
        }catch( err ){
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return { events: [], totalRetrieved: 0 };
        }

        try{
            return { event : cursor };
        }catch( err ){
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
     * @status READY
     */
    static async createEvent(event: IEvent){
        const { active } = event;
        return active ? this.createActiveEvent(event) : this.createArchivedEvent(event);
    }

    /**
     * @status READY
     */
    static async updateEvent(event: IEvent){
        const { active } = event;
        const collectionToDeleteFrom = active ? ArchivedEvents : ActiveEvents;
        const id = new ObjectId(event.id);

        const documentFound = await collectionToDeleteFrom.findOne( { _id: id } );

        if( documentFound ){
            collectionToDeleteFrom.deleteOne( { _id: id } );
            return active ? this.createActiveEvent(event) : this.createArchivedEvent(event);
        }

        return active ? this.updateActiveEvent(event) : this.updateArchivedEvent(event);
    }

    /**
     * @status READY
     */
    static async deleteEvent(event: IEvent){
        const { active } = event;
        return active ? this.deleteActiveEvent(event) : this.updateArchivedEvent(event);
    }

    /**
     * @status READY
     * @param param0 
     */
    static async createArchivedEvent(event: IEvent){
        try{
            return await ArchivedEvents.insertOne( event );
        }catch( err ){
            console.error(
                `Unable to insert a new document: ${err.message}`
            );
            return { error: err };
        }
    };
    
    
    /**
     * @status READY
     * @param param0 
     */
    static async createActiveEvent(event: IEvent){
        try{
            return await ActiveEvents.insertOne( event );
        }catch( err ){
            console.error(
                `Unable to insert a new document: ${err.message}`
            );
            return { error: err };
        }
    };

    /**
     * @status READY
     * @param param0 
     */
    static async updateArchivedEvent(event : IEvent){
        const {id, ...updateBody} =  event;
         try{
            return await ArchivedEvents.updateOne( 
                { _id : new ObjectId(id) },
                { $set :  updateBody } 
            );
        }catch( err ){
            console.error(
                `Unable to update a document: ${err.message}`
            );
            return { error: err };
        }
    };  

    /**
     * @status READY
     * @param param0 
     */
    static async updateActiveEvent(event : IEvent){
       const {id, ...updateBody} =  event;
         try{
            return await ActiveEvents.updateOne( 
                { _id : new ObjectId(id) },
                { $set :  updateBody } 
            );
        }catch( err ){
            console.error(
                `Unable to update a document: ${err.message}`
            );
            return { error: err };
        }
    };

    
    /** 
     * @status READY
     * @param param0 
     */
    static async deleteArchvedEvent({ id = '' } = {}){
        const filter = { _id : new ObjectId(id) };
        try{
            return await ArchivedEvents.deleteOne( filter );
        }catch( err ){
            console.error(
                `Unable to delete a document: ${err.message}`
                );
                return { error: err };
            }
        };

  
    /** 
     * @status READY
     * @param param0 
     */
    static async deleteActiveEvent({ id = '' } = {}){
        const filter = { _id : new ObjectId(id) };
        try{
            return await ArchivedEvents.deleteOne( filter );
        }catch( err ){
            console.error(
                `Unable to delete a document: ${err.message}`
                );
                return { error: err };
            }
        };
}
