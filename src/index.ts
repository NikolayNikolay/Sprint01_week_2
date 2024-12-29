import {app} from './app'
import {SETTINGS} from './settings'
import { runDB } from './db/mongo-db'
import {config} from 'dotenv'
   config()


export const startServer = async () => {
    
    try {
      await runDB(); // Connect to MongoDB
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

