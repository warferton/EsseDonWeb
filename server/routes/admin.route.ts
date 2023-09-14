import express from 'express';
import AdminController from '../controller/adminController';
import MediaDao from '../dao/mediaDAO';
import { extractJWT } from '../util/jwt-util';


const router = express.Router();

 /* ==============  EVENTS ============== */

// Get All Archived Events
router.route('/events/get/archived').get(AdminController.getArchivedEvents);

/**
 * Create Event
 */
router.route('/events/create').post(extractJWT).post(MediaDao.uploadMedia).post(AdminController.createEvent);

/**
 * Update Event
 */
router.route('/events/update').put(extractJWT).put(MediaDao.updateEventMediaHandler).put(AdminController.updateEvent);

/**
 * Update Groups of Active Events
 */
router.route('/events/update/group').put(extractJWT).put(AdminController.updateEventGroup);

/**
 * Switch DBs for Events
 */
router.route('/events/update/switchDb').put(extractJWT).put(AdminController.updateEventSwitchDb);

/**
 * Delete Events
 */
router.route('/events/delete').post(extractJWT).post(AdminController.deleteEvents);

/* ============== MENU ============== */

// Create Menu Item
router.route('/menu/create').post(extractJWT).post(AdminController.createMenuItem);

// Update Menu Item
router.route('/menu/update').put(extractJWT).put(AdminController.updateMenuItem);


// Delete Menu Item
router.route('/menu/delete').delete(extractJWT).delete(AdminController.deleteMenuItem);

//special 
router.route('/menu/kitchen/many').post(extractJWT).post(AdminController.createMany);

/* ============== MEDIA ============== */

//media get
router.route('/media/:mediaId').get(AdminController.getMediaFile);

//media uploads
router.route('/media/upload/:mediaType').post(extractJWT).post(AdminController.uploadMedia);


export default router;
