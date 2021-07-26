import express from 'express';
import AdminController from '../controller/adminController';


const router = express.Router();

 /* ==============  EVENTS ============== */

// Get All Archived Events
router.route('/events/get/archived').get(AdminController.getArchivedEvents);


// Create Archived Event
router.route('/events/create/archived').post(AdminController.createArchivedEvent);

// Create Active Event
router.route('/events/create/active').post(AdminController.createActiveEvent);


// Update Archived Event
router.route('/events/update/archived').put(AdminController.updateArchivedEvent);

// Update Active Event
router.route('/events/update/active').put(AdminController.updateActiveEvent);


// Delete Archived Event
router.route('/events/delete/archived').delete(AdminController.deleteArchvedEvent);

// Delete Active Event
router.route('/events/delete/active').delete(AdminController.deleteActiveEvent);

/* ==============  MENU ============== */

// Create Menu Item
router.route('/menu/create').post(AdminController.createMenuItem);

// Update Menu Item
router.route('/menu/update').put(AdminController.updateMenuItem);

// Delete Menu Item
router.route('/menu/delete').delete(AdminController.deleteMenuItem);


export default router;
