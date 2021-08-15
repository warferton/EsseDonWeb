import express from 'express';
import EventsController from '../controller/eventsController';

const router = express.Router();

//Get active events data
router.route('/active').get(EventsController.getActiveEvents);

//Get event by id
router.route('/:id').get(EventsController.getEventById);



//Mock REST
router.route('/test').post(( req: any, res : any) => res.status(201).send());

router.route('/test').put(( req: any, res : any) => res.status(200).send());

router.route('/error').put(( req: any, res : any) => res.status(404).send());



export default router;