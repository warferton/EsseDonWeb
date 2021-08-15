import MenuDao from '../dao/menuDAO';

export default class MenuController{
    static async getAllMenuItems(req: any, res : any){
        try{
            const EventResponse = await MenuDao.getAllMenuItems();

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async getAllBarItems(req: any, res : any){
        try{
            const EventResponse = await MenuDao.getAllBarItems();

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async getAllKitchenItems(req: any, res : any){
        try{
            const EventResponse = await MenuDao.getAllKitchenItems();

            res.status(200).send(EventResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }
}