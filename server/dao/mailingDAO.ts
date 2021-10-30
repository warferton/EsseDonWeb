import mailer from '@sendgrid/mail';
import { IBookingData, IPerformRequestData } from '../types/mail.type';
import config from '../config/server-config';

mailer.setApiKey(config.mailing.apiToken);

export default class MailingDao {

    static async sendPerformRequestMail(mail : IPerformRequestData) {
        const mailToClient = {
            to: mail.email,
            from: 'automated@essedon.ru',
            templateId: config.mailing.performerTemplate.client,
            dynamicTemplateData: { name: mail.name }
        }
        const mailToServer = {
            to: 'warferton45@gmail.com',//'art@jazzesse.ru',
            from: 'automated@essedon.ru',
            templateId: config.mailing.performerTemplate.server,
            dynamicTemplateData: mail
        }

        return this.doubleSend(mailToClient, mailToServer);

    }

    static async sendBookingMail(mail : IBookingData) {
        const mailToClient = {
            to: mail.email,
            from: 'automated@essedon.ru',
            templateId: config.mailing.bookingTemplate.client,
            dynamicTemplateData: mail
        }
        const mailToServer = {
            to: 'warferton45@gmail.com',//'pr@jazzesse.ru',
            from: 'automated@essedon.ru',
            templateId: config.mailing.bookingTemplate.server,
            dynamicTemplateData: mail
        }

        return this.doubleSend(mailToClient, mailToServer);

    }

    static async doubleSend (mailToClient : any, mailToServer: any) {
        console.log('Sending email to client\'s address');
        await mailer.send(mailToClient)
        .then( res => console.log(`Email sent to ${mailToClient.to}`))
        .catch(err => {
            const error = new Error(err.message);
            console.log(`Failed sending email to ${mailToClient.to}`);
            throw error;
        });
        console.log('Sending email to our address');
        await mailer.send(mailToServer)
        .then( res => console.log(`Email sent to ${mailToServer.to}`))
        .catch(err => {
            const error = new Error(err.message);
            console.log(`Failed sending email to ${mailToServer.to}`);
            throw error;
        });
        console.log('Emails were sent successfully');

        return { message: 'SUCCESS' };
    }
    
}