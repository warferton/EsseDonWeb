import MailingDao from '../dao/mailingDAO';

export default class MailingController{

    static async sendBookingMail(req: any, res : any){
        try{
            const mail = req.body
            const MailingResponse = await MailingDao.sendBookingMail(mail);
            res.status(200).send(MailingResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }

    static async sendPerformRequestMail(req: any, res : any){
        try{
            const mail = req.body
            const MailingResponse = await MailingDao.sendPerformRequestMail(mail);
            res.status(200).send(MailingResponse);
        } catch(error : any) {
            const err = new Error(error);
            res.status(500).send(err.message);
        }
    }
}