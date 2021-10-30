import MenuDao from '../dao/menuDAO';

export default class MenuController{
    static async getAllMenuItems(req: any, res : any){
        try{
            const MenuResponse = await MenuDao.getAllMenuItems();

            res.status(200).send(MenuResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    static async getAllBarItems(req: any, res : any){
        try{
            const MenuResponse = await MenuDao.getAllBarItems();

            res.status(200).send(MenuResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    static async getAllKitchenItems(req: any, res : any){
        try{
            const MenuResponse = await MenuDao.getAllKitchenItems();

            res.status(200).send(MenuResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    static async getMenuItems(req: any, res : any){
        try{
            const category = req.params.category;
            const MenuResponse = await MenuDao.getMenuItems(category);

            res.status(200).send(MenuResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }
}