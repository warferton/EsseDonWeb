import express from 'express';
import MenuController from '../controller/menuController'

const router = express.Router();

// Get All items in two menus ( bar + kitchen )
router.route('/all').get(MenuController.getAllMenuItems);


// // Get All Items in the Bar or Kitchen menu
router.route('/:category').get((req, res) => {

    const category = req.params.category;

    if(category === 'bar'){
       return MenuController.getAllBarItems(req, res);
    }
    else if (category === 'kitchen'){
        return MenuController.getAllKitchenItems(req, res);
    }
    else{
        return res.status(404).send({error: 'Bad Request'})
    }
});



export default router;