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
<<<<<<< HEAD

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
=======
>>>>>>> 60fe833e081b48d6877fc43a47cac16bdc0aecb1
}