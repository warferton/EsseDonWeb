import MailingDao from '../dao/mailingDAO';

export default class MailingController{

    static async sendBookingMail(req: any, res : any){
        try{
            const MailingResponse = await MailingDao.sendMail();
            res.status(200).send(MailingResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async sendPerformRequestMail(req: any, res : any){
        try{
            const MailingResponse = await MailingDao.sendMail();
            res.status(200).send(MailingResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }
}