import MailingDao from '../dao/mailingDAO';

export default class MailingController{

    static async sendBookingMail(req: any, res : any){
        try{
            res.status(200).send(Response);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async sendPerformRequestMail(req: any, res : any){
        try{
            res.status(200).send(Response);
        }catch(err){
            res.status(500).send(err.message);
        }
    }
}