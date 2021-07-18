import express from 'express';
import EventsController from '../controller/eventsController';

const router = express.Router();

//Get active events data
router.route('/active').get(EventsController.getActiveEvents);

//Get archived events data
/**
 * @TODO 
 * Transfer to admin controls
 * */
router.route('/archived').get(EventsController.getArchivedEvents);


export default router;