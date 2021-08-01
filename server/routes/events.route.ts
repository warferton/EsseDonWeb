import express from 'express';
import EventsController from '../controller/eventsController';

const router = express.Router();

//Get active events data
router.route('/active').get(EventsController.getActiveEvents);



router.route('/testPost').post(( req: any, res : any) => res.status(201).send());

router.route('/testPut').post(( req: any, res : any) => res.status(200).send());


export default router;