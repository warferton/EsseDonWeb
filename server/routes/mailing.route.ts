import express from 'express';
import MailingController from '../controller/mailingController';

const router = express.Router();

//Send email notifying about event booking
router.route('/bookingMail').post(MailingController.sendBookingMail);

//Send email request for band to perform
router.route('/perfrormRequestMail').post(MailingController.sendPerformRequestMail);

export default router;