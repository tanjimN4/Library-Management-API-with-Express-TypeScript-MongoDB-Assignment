import mongoose from "mongoose";
import app from "./app";


const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/library_management';

const port = 5000;
const server = async () => {
    try {
        await mongoose.connect(url);
        console.log('Database Connected Successfully');

        app.listen(port, () => {
            console.log('Library Management API SERVER IS RUNNING ON PORT', port);

        })
    } catch (error) {
        console.log(error);

    }
}

server()