import mongodb from 'mongodb';
import EventDao from './dao/eventDAO';
import MenuDao from './dao/menuDAO';
import AuthDao from './dao/authDAO';
import MediaDao from './dao/mediaDAO';
import app from './server';
import config from './config/server-config';
import { sys } from 'typescript';

const MongoClient = mongodb.MongoClient;

const port = config.port;
const db_url = config.dbUrl;

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
    await EventDao.injectDB(client)
    .then(() =>     console.info('Event DB connection established'))
    .catch(err => {console.error("Failed to connect to Event DB"); sys.exit(1)});
    await MenuDao.injectDB(client)
    .then(() => console.info('Menu DB connection established'))
    .catch(err => console.error("Failed to connect to Menu DB"));
    await AuthDao.injectDB(client)
    .then(() => console.info('Users DB connection established'))
    .catch(err => console.error("Failed to connect to Users DB"));
    await MediaDao.injectDB(client)
    .then(() => console.info('Media DB connection established'))
    .catch(err => {console.error("Failed to connect to Media DB"); sys.exit(1)});
    
    console.info('ALL DB\'s connection established');
    app.listen(port, () => {
        console.info(`Started Listenning on port: ${ port }`);
    });
})