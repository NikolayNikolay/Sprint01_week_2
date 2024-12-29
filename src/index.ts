import {app} from './app'
import {SETTINGS} from './settings'
import { runDB } from './db/mongo-db'



export const startServer = async () => {
    console.log(1111111111);
    
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

