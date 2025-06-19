import { Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const books = new Schema<IBook>({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre:{
        type: String,
        required: true,
        enum : ['Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Fantasy'],
        trim: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available:{
        type: Boolean,
        default: true
    }
})