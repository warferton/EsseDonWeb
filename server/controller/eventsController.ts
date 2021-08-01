import EventDao from '../dao/eventDAO';

export default class EventsController{

    static async getActiveEvents(req: any, res : any){
        try{

            const filters = req.query;

            console.log(filters);
            
            const EventResponse = await EventDao.getActiveEvents( filters );

            res.status(200).send(EventResponse);
        }catch(err){
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

            console.log(filters);

            const EventResponse = await EventDao.getArchivedEvents( filters );

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
        
    }
}