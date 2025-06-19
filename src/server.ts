import mongoose from "mongoose";
import app from "./app";

const uri = "mongodb+srv://mongoose:yGUZ.gTgW9mHcx7@cluster0.hblj92w.mongodb.net/library?retryWrites=true&w=majority&appName=Cluster0";

const port = 5000;
const server = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Database Connected Successfully');

        app.listen(port, () => {
            console.log('Library Management API SERVER IS RUNNING ON PORT', port);

        })
    } catch (error) {
        console.log(error);

    }
}

server()