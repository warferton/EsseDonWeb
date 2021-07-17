import mongodb from 'mongodb';
import dotenv from 'dotenv';
import EventDao from './dao/eventDAO';
import MenuDao from './dao/menuDAO';
import app from './server';

dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env['PORT'] || 8080;
const db_url = process.env['DB_URL'] || 'localhost';

MongoClient.connect(
    db_url,
    {
        poolSize: 50,
        maxIdleTimeMS: 10000,
        wtimeout: 2500,
        useNewUrlParser: true,
    }
).catch(err => {
    console.error(
        `Unable to connect to Mongo Atlas Database instance: ${ err }`
    );
    process.exit(1);
    
}).then( async client => {
    await EventDao.injectDB(client);
    console.info('Event DB connection established');
    await MenuDao.injectDB(client);
    console.info('Menu DB connection established');
    console.info('ALL DB\'s connection established');
    app.listen(port, () => {
        console.info(`Started Listenning on port: ${ port }`);
    });
})