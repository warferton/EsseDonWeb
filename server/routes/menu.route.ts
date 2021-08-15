import express from 'express';
import MenuController from '../controller/menuController'

const router = express.Router();

// Get All items in two menus ( bar + kitchen )
router.route('/all').get(MenuController.getAllMenuItems);


// // Get All Items in the Bar or Kitchen menu
// router.route('/?category=:category/all').get((req, res) => {

//     const category = req.params.category;

//     const items = allItems.map((item) => {
//         return item.category===category && item;
//     })
//     items ?
//     res.status(200).send( items )
//     :
//     res.status(404).send({
//         error: 'Not Found. There are no objects with such parameters that exist.'
//     });
// });



export default router;