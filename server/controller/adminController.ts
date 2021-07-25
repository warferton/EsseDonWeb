import EventDao from '../dao/eventDAO';

export default class EventsController{

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
    static async createArchivedEvent(req: any, res : any){
        try{

            const body = req.body;
            const EventResponse = await EventDao.createArchivedEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
        
    }

     /**
     * @param req 
     * @param res 
     */ 
    static async createActiveEvent(req: any, res : any){
        try{

            const body = req.body;
            const EventResponse = await EventDao.createActiveEvent( body );

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
        
    }

     /**
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
}
