import {app} from './app'
import {mongoURI, SETTINGS} from './settings'
import { runDB } from './db/mongo-db'
import {config} from 'dotenv'
import ngrok from 'ngrok';

config()

const startServer = async () => {
    
    try {
      await runDB(mongoURI); // Connect to MongoDB
        app.set('trust proxy', true)
        app.listen(SETTINGS.PORT, () => {
        console.log('...server started in port ' + SETTINGS.PORT)
    })
    } catch (error) {
        console.error("Error starting the server:", error);
    }
};

if (process.env.NODE_ENV !== "test") {
    startServer();
}
