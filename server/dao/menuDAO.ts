import { MongoClient, Collection } from "mongodb";


let BarItems : Collection;
let KitchenItems : Collection;

export default class MenuDbClient{
    
    static async injectDB(connection : MongoClient){
        if( BarItems && KitchenItems )
            return;

        try{
            if( !BarItems )
                BarItems = await connection.db(process.env['MENU_NS']).collection('bar_items');
            if( !KitchenItems )
                KitchenItems = await connection.db(process.env['MENU_NS']).collection('kitchen_items');

        }catch(err){
            console.error(
                `Unable to retrieve data from the database: ${ err.message }`
            );
        }
    }

    /**
     * @status TESTING
     * @returns 
     */
    static async getAllMenuItems() {
        let barCursor;
        let kitchenCursor;

        try {
            barCursor = await BarItems.find();
        }catch( err ){
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {barItems: [], totalNumBar: 0};
        }
        try {
            kitchenCursor = await BarItems.find();
        }catch( err ){
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {kitchenItems: [], totalNumBar: 0};
        }


        try{

            const barItems = await barCursor.toArray();
            const kitchenItems = await kitchenCursor.toArray();

            const totalBarItems = await BarItems.countDocuments();
            const totalKitchenItems = await KitchenItems.countDocuments();

            return {barItems, totalBarItems, kitchenItems, totalKitchenItems};

        }catch( err ){
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {barItems: [], totalBarItems: 0, kitchenItems: [], totalKitchenItems: 0};
        }



    }
}