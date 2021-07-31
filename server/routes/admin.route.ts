import express from 'express';
import AdminController from '../controller/adminController';


const router = express.Router();


// Get All Archived Events
router.route('/events/get/archived').get(AdminController.getArchivedEvents);


/**
 * Create Event
 */
router.route('/events/create').post(AdminController.createEvent);

/**
 * Update Archived Event
 */
router.route('/events/update').put(AdminController.updateEvent);

/**
 * Delete Active Event
 */
router.route('/events/delete').delete(AdminController.deleteEvent);


/**
 * @deprecated
 * Create Archived Event
 */
router.route('/events/create/archived').post(AdminController.createArchivedEvent);

/**
 * @deprecated
 * Create Active Event*
 */
router.route('/events/create/active').post(AdminController.createActiveEvent);


/**
 * @deprecated
 * Update Archived Event
 */
router.route('/events/update/archived').put(AdminController.updateArchivedEvent);

/**
 * @deprecated
 * Update Active Event
 */
router.route('/events/update/active').put(AdminController.updateActiveEvent);


/**
 * @deprecated
 * Delete Archived Event
 */ 
router.route('/events/delete/archived').delete(AdminController.deleteArchvedEvent);

/**
 * @deprecated
 * Delete Active Event
 */
router.route('/events/delete/active').delete(AdminController.deleteActiveEvent);




export default router;