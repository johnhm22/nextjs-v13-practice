import mongoose from 'mongoose';

let isConnected = false; //allows us to track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    //if not already connected, we open a new try/catch block
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'share_prompt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); //we try to establish the connection
        console.log('New connection with mongodb established');
        isConnected = true; //if connection above succeeds
    } catch (error) {
        console.log('Mongodb error connection is: ', error);
    }
};
