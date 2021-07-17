import EventDao from '../dao/eventDAO';

export default class EventsController{
    static async getActiveEvents(req: any, res : any){
        try{

            const filters = req.query.filter;
            const EventResponse = await EventDao.getActiveEvents(filters);

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
        
    }

    static async getArchivedEvents(req: any, res : any){
        try{

            const filters = req.query.filter;
            const EventResponse = await EventDao.getArchivedEvents(filters);

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
        
    }
}