import EventDao from '../dao/eventDAO';

export default class EventsController{

    static async getEventById(req: any, res : any){
        try{

            const id = req.params.id;
            
            const EventResponse = await EventDao.getEventById( id );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            console.error(err);
            
            res.status(500).send(err.message);
        }
    }

    static async getActiveEvents(req: any, res : any){
        try{

            const filters = req.query;
            
            const EventResponse = await EventDao.getActiveEvents( filters );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
        
    }


    /**
     * @todo To be removed after testing
     * @param req 
     * @param res 
     */
    static async getArchivedEvents(req: any, res : any){
        try{

            const filters = req.query;

            const EventResponse = await EventDao.getArchivedEvents( filters );

            res.status(200).send(EventResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
        
    }
}