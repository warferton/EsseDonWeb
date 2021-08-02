import MenuDao from '../dao/menuDAO';

export default class EventsController{
    static async getAllMenuItems(req: any, res : any){
        try{
            const EventResponse = await MenuDao.getAllMenuItems();

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }
}