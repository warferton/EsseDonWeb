import express from 'express';
import AdminController from '../controller/adminController';


const router = express.Router();


// Get All Archived Events
router.route('/events/get/archived').get(AdminController.getArchivedEvents);


// Create Archived Event
router.route('/events/create').post(AdminController.createArchivedEvent);

// Create Active Event
router.route('/events/update/active').post(AdminController.createActiveEvent);


// Update Archived Event
router.route('/events/update/archived').put(AdminController.updateArchivedEvent);

// Update Active Event
router.route('/events/update/active').put(AdminController.updateActiveEvent);


// Delete Event
router.route('/events').delete(AdminController.deleteEvent);





export default router;