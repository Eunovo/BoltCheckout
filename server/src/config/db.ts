import mongoose from 'mongoose';

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
    throw Error('DB_URL is not defined');
}

mongoose.connect(DB_URL, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Database Connected");
});

mongoose.connection.on('disconnect', () => {
    console.log("Database disconnected");
});