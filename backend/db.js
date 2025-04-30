import mongoose from 'mongoose';
import CONNECTION_STRING from './config.js';

const uri = CONNECTION_STRING

async function DatabaseConnection() {
    try {
        await mongoose.connect(uri);
        console.log("database connected");
    } catch (error) {
        console.log("database connection error", error);
    }
    // finally {
    //     await mongoose.disconnect();
    //     console.log("database connected");
    // }
}

DatabaseConnection()

export default DatabaseConnection;
