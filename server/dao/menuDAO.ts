import { MongoClient, Collection, ObjectId } from "mongodb";
import { IMenuItem } from "../types/menu-item.type";
import config from '../config/server-config';


let BarItems : Collection;
let KitchenItems : Collection;
let SpecialItems : Collection;
let VeganItems : Collection;

export default class MenuDbClient{
    
    static async injectDB(connection : MongoClient){
        if( BarItems && KitchenItems )
            return;

        try{
            if( !BarItems )
                BarItems = await connection.db(config.dataBases.menu).collection('bar_items');
            if( !KitchenItems )
                KitchenItems = await connection.db(config.dataBases.menu).collection('kitchen_items');
            if( !SpecialItems )
                SpecialItems = await connection.db(config.dataBases.menu).collection('special_items');
            if( !VeganItems )
                VeganItems = await connection.db(config.dataBases.menu).collection('vegan_items');

        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to retrieve data from the database: ${ err.message }`
            );
        }
    }

    /**
     * @status READY 
     */
    static async getAllMenuItems() {
        let barCursor;
        let kitchenCursor;

        try {
            barCursor = await BarItems.find();
        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {barItems: [], totalNumBar: 0};
        }
        try {
            kitchenCursor = await KitchenItems.find();
        } catch(error : any) {
            const err = new Error( error.message as string );
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

        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {barItems: [], totalBarItems: 0, kitchenItems: [], totalKitchenItems: 0};
        }
    }

     /**
     * @status READY 
     */
    static async getAllKitchenItems() {
        let kitchenCursor;

        try {
            kitchenCursor = await KitchenItems.find();
        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {kitchenItems: [], totalNumBar: 0};
        }


        try{
            const kitchenItems = await kitchenCursor.toArray();
            const totalKitchenItems = await KitchenItems.countDocuments();
            return {kitchenItems, totalKitchenItems};

        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {kitchenItems: [], totalKitchenItems: 0};
        }
    }

     /**
     * @status READY 
     */
    static async getAllBarItems() {
        let barCursor;

        try {
            barCursor = await BarItems.find();
        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to issue "find" command: ${ err.message }`
            );
            return {barItems: [], totalNumBar: 0};
        }

        try{
            const barItems = await barCursor.toArray();
            const totalBarItems = await BarItems.countDocuments();
            return {barItems, totalBarItems};

        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to convert cursor to an array: ${err.message}`
            );
            return {barItems: [], totalBarItems: 0};
        }
    }

     /**
     * @status READY
     */
    static async createMenuItem(menuItem: IMenuItem){
        const collection = this.getCollectionFromCategory(menuItem.category);
        try{
            return await collection.insertOne( menuItem );
        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to insert a new document: ${err.message}`
            );
            return { error: err };
        }
    };

    /**
     * @status READY
     */
    static async createKitchenItem(menuItem: IMenuItem){
        try{
            return await KitchenItems.insert( menuItem );
        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to insert a new document: ${err.message}`
            );
            return { error: err };
        }
    };

    /**
     * @status READY
     */
    static async updateMenuItem(menuItem: IMenuItem){
        const collection = this.getCollectionFromCategory(menuItem.category);
        const {id, ...updateBody} =  menuItem;
        try{
            return await collection.updateOne( 
                { _id : new ObjectId(id) },
                { $set: updateBody } 
            );
        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to update an existing document: ${err.message}`
            );
            return { error: err };
        }
    };

    /**
     * @status READY
     */
    static async deleteMenuItem(menuItem: IMenuItem){
        const collection = this.getCollectionFromCategory(menuItem.category);
        const { id } =  menuItem;
        try{
            return await collection.deleteOne( { _id : new ObjectId(id) } );
        } catch(error : any) {
            const err = new Error( error.message as string );
            console.error(
                `Unable to delete an existing document: ${err.message}`
            );
            return { error: err };
        }
    };


    static getCollectionFromCategory( category : string ){
        switch( category ){
            case 'bar': return BarItems;
            case 'kitchen': return KitchenItems;
            case 'special': return SpecialItems;
            case 'vegan': return VeganItems;
            default: return KitchenItems;
        }
    }
}
