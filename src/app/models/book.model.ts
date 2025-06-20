import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const booksSchema = new Schema<IBook>({
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
        uppercase: true,
        required: true,
        enum : ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
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
        min: [0,'Copies must be a positive number']
    },
    available:{
        type: Boolean,
        default: true
    }
},{
     timestamps: true,
    versionKey: false
})

export const book=model<IBook>('Book', booksSchema);