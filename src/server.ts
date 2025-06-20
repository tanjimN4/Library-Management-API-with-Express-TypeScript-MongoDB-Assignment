import mongoose from "mongoose";
import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGODB_URL;

const port = 5000;
const server = async () => {
    try {
        await mongoose.connect(url as string);
        console.log('Database Connected Successfully');

        app.listen(port, () => {
            console.log('Library Management API SERVER IS RUNNING ON PORT', port);

        })
    } catch (error) {
        console.log(error);

    }
}

server()