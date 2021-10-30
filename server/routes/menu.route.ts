import express from 'express';
import MenuController from '../controller/menuController'

const router = express.Router();

// Get All items in two menus ( bar + kitchen )
router.route('/all').get(MenuController.getAllMenuItems);


// // Get All Items in the category
router.route('/:category').get(MenuController.getMenuItems);



export default router;