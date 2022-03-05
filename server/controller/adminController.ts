import EventDao from '../dao/eventDAO';
import MenuDao from '../dao/menuDAO';
import MediaDao from '../dao/mediaDAO';
import { Request, Response } from 'express';

export default class EventsController{


    /* ==============  EVENTS ============== */

    static async getArchivedEvents(req: any, res : any){
        try{

            const filters = req.query;
            const EventResponse = await EventDao.getArchivedEvents(filters);

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    /**
     * @param req 
     * @param res 
     */
    static async createEvent(req: Request, res : Response){
        try{

            const event = req.body;
            event.image = res.locals['mediaId'];
            const EventResponse = await EventDao.createEvent( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    /**
     * @param req 
     * @param res 
     */
    static async updateEvent(req: any, res : any){
        try{
            
            const {media, ...event} = req.body;
            event.image = res.locals['mediaId'];
            const EventResponse = await EventDao.updateEvent( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

     /**
     * @status READY
     */
    static async updateEventGroup(req: any, res : any){
        try{

            const event = req.body;
            const EventResponse = await EventDao.updateActiveEventGroup( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    /**
     * @deprecated
     * @status READY
     */
    static async updateEventSwitchDb(req: any, res : any){
        try{

            const event = req.body;
            const EventResponse = await EventDao.switchEventsDb( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    /**
     * @param req 
     * @param res 
     */
    static async deleteEvents(req: any, res : any){
        try{
            const eventIds = req.body;
            const EventResponse = await EventDao.deleteEvents( eventIds );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        } 
    }

    /**
     * @deprecated
     * @param req 
     * @param res 
     */    
    static async createArchivedEvent(req: any, res : any){
        try{

            const event = req.body;
            const EventResponse = await EventDao.createArchivedEvent( event );

            res.status(201).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    /**
     * @deprecated
     * @param req 
     * @param res 
     */ 
    static async createActiveEvent(req: any, res : any){
        try{

            const event = req.body;
            const EventResponse = await EventDao.createActiveEvent( event );

            res.status(201).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

     /**
      * @deprecated
      * @param req 
      * @param res 
      */ 
    static async updateArchivedEvent(req: any, res : any){
        try{

            const event = req.body;
            const EventResponse = await EventDao.updateArchivedEvent( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

     /**
      * @deprecated
      * @param req 
      * @param res 
      */ 
    static async updateActiveEvent(req: any, res : any){
        try{

            const event = req.body;
            const EventResponse = await EventDao.updateActiveEvent( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

     /**
      * @deprecated
      * @param req 
      * @param res 
      */ 
    static async deleteActiveEvent(req: any, res : any){
        try{

            const event = req.body;
            const EventResponse = await EventDao.deleteActiveEvent( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        } 
    }


     /**
     * @deprecated
     * @param req 
     * @param res 
     */ 
    static async deleteArchvedEvent(req: any, res : any){
        try{

            const event = req.body;
            const EventResponse = await EventDao.deleteArchvedEvent( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }


    /* ==============  MENU ============== */

    static async createMenuItem( req: any, res: any ) {
        try{
            const event = req.body;
            const EventResponse = await MenuDao.createMenuItem( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    /**@todo */
    static async createMany( req: any, res: any ) {
        try{
            const event = req.body;
            const EventResponse = await MenuDao.createKitchenItem( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    static async updateMenuItem( req: any, res: any ) {
        try{
            const event = req.body;
            const EventResponse = await MenuDao.updateMenuItem( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    static async deleteMenuItem( req: any, res: any ) {
        try{
            const event = req.body;
            const EventResponse = await MenuDao.deleteMenuItem( event );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    static async uploadMedia( req: any, res: any, next: any ) {
        try{
            const EventResponse = await MediaDao.uploadMedia( req, res, next );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    static async getMediaFile( req: any, res: any ) {
        try{
            const imageParams = req.params;
            const EventResponse = await MediaDao.getMediaFile( imageParams );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

}
