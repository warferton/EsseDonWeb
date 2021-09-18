import express from 'express';
import { extractJWT } from 'util/jwt-util';
import AdminController from '../controller/adminController';


const router = express.Router();

 /* ==============  EVENTS ============== */

// Get All Archived Events
router.route('/events/get/archived').get(AdminController.getArchivedEvents);

/**
 * Create Event
 */
router.route('/events/create').post(extractJWT).post(AdminController.createEvent);

/**
 * Update Event
 */
router.route('/events/update').put(extractJWT).put(AdminController.updateEvent);

/**
 * Update Groups of Active Events
 */
router.route('/events/update/group').put(extractJWT).put(AdminController.updateEventGroup);

/**
 * @deprecated
 * Switch DBs for Events
 */
router.route('/events/update/switchDb').put(extractJWT).put(AdminController.updateEventSwitchDb);

/**
 * Delete Event
 */
router.route('/events/delete').delete(extractJWT).delete(AdminController.deleteEvent);


/**
 * @deprecated
 * Create Archived Event
 */
router.route('/events/create/archived').post(extractJWT).post(AdminController.createArchivedEvent);

/**
 * @deprecated
 * Create Active Event*
 */
router.route('/events/create/active').post(extractJWT).post(AdminController.createActiveEvent);


/**
 * @deprecated
 * Update Archived Event
 */
router.route('/events/update/archived').put(extractJWT).put(AdminController.updateArchivedEvent);

/**
 * @deprecated
 * Update Active Event
 */
router.route('/events/update/active').put(extractJWT).put(AdminController.updateActiveEvent);

/**
 * @deprecated
 * Delete Archived Event
 */ 
router.route('/events/delete/archived').delete(extractJWT).delete(AdminController.deleteArchvedEvent);

/**
 * @deprecated
 * Delete Active Event
 */
router.route('/events/delete/active').delete(extractJWT).delete(AdminController.deleteActiveEvent);

/* ==============  MENU ============== */

// Create Menu Item
router.route('/menu/create').post(extractJWT).post(AdminController.createMenuItem);

// Update Menu Item
router.route('/menu/update').put(extractJWT).put(AdminController.updateMenuItem);


// Delete Menu Item
router.route('/menu/delete').delete(extractJWT).delete(AdminController.deleteMenuItem);


//special 
router.route('/menu/kitchen/many').post(extractJWT).post(AdminController.createMany);


export default router;
