import EventDao from '../dao/eventDAO';
import MenuDao from '../dao/menuDAO';

export default class EventsController{


    /* ==============  EVENTS ============== */

    static async getArchivedEvents(req: any, res : any){
        try{

            const filters = req.query;
            const EventResponse = await EventDao.getArchivedEvents(filters);

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
        
    }

    /**
     * @param req 
     * @param res 
     */
    static async createEvent(req: any, res : any){
        try{

            const body = req.body;
            const EventResponse = await EventDao.createEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
        
    }

    /**
     * @param req 
     * @param res 
     */
    static async updateEvent(req: any, res : any){
        try{

            const body = req.body;
            const EventResponse = await EventDao.updateEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
        
    }

    /**
     * @param req 
     * @param res 
     */
    static async deleteEvent(req: any, res : any){
        try{

            const body = req.body;
            const EventResponse = await EventDao.deleteEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
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

            const body = req.body;
            const EventResponse = await EventDao.createArchivedEvent( body );

            res.status(201).send(EventResponse);
        }catch(err){
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

            const body = req.body;
            const EventResponse = await EventDao.createActiveEvent( body );

            res.status(201).send(EventResponse);
        }catch(err){
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

            const body = req.body;
            const EventResponse = await EventDao.updateArchivedEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
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

            const body = req.body;
            const EventResponse = await EventDao.updateActiveEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
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

            const body = req.body;
            const EventResponse = await EventDao.deleteActiveEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
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

            const body = req.body;
            const EventResponse = await EventDao.deleteArchvedEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }


    /* ==============  MENU ============== */

    static async createMenuItem( req: any, res: any ) {
        try{
            const body = req.body;
            const EventResponse = await MenuDao.createMenuItem( body );

            res.status(200).send(EventResponse);
        } catch(err){
            res.status(500).send(err.message);
        }
    }

    /**@todo */
    static async createMany( req: any, res: any ) {
        try{
            const body = req.body;
            const EventResponse = await MenuDao.createKitchenItem( body );

            res.status(200).send(EventResponse);
        } catch(err){
            res.status(500).send(err.message);
        }
    }

    static async updateMenuItem( req: any, res: any ) {
        try{
            const body = req.body;
            const EventResponse = await MenuDao.updateMenuItem( body );

            res.status(200).send(EventResponse);
        } catch(err){
            res.status(500).send(err.message);
        }
    }

    static async deleteMenuItem( req: any, res: any ) {
        try{
            const body = req.body;
            const EventResponse = await MenuDao.deleteMenuItem( body );

            res.status(200).send(EventResponse);
        } catch(err){
            res.status(500).send(err.message);
        }
    }

}
