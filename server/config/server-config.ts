import dotenv from 'dotenv';

dotenv.config();

//CONNECTIONS
const port = process.env['PORT'] || 8080;
const dbUrl = process.env['DB_URL'] || 'localhost';

//DB IDENTIFIERS
const events = process.env['EVENTS_NS'] || '';
const menu = process.env['MENU_NS'] || '';
const users = process.env['USERS_NS'] || '';

// JWT TOKEN
const secret = process.env['JWT_SECRET'] || 'secretsecretsecret123';
const issuer = process.env['JWT_ISSUER'] || 'noissuer';
const expire = Number(process.env['JWT_EXPIRE']) || 1;

//MAILING
const apiToken = process.env['SENDGRID_API_TOKEN'] || '';
const clientBookingTemplate =  process.env['CLIENT_BOOKING_TEMPLATE_ID'] || ''
const clientPerformerTemplate = process.env['CLIENT_PERFORMER_TEMPLATE_ID'] || ''
const serverBookingTemplate = process.env['SERVER_BOOKING_TEMPLATE_ID'] || ''
const serverPerformerTemplate = process.env['SERVER_PERFORMER_TEMPLATE_ID'] || ''

const config = {
    port,
    dbUrl,
    dataBases: {
        events,
        menu,
        users
    },
    token: {
        secret,
        issuer,
        expire
    },
    mailing: {
        apiToken,
        bookingTemplate: {
            client: clientBookingTemplate,
            server: serverBookingTemplate
        },
        performerTemplate: {
            client: clientPerformerTemplate,
            server: serverPerformerTemplate
        }
    }
}

export default config;