"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.book = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
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
    genre: {
        type: String,
        uppercase: true,
        required: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
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
        min: [0, 'Copies must be a positive number']
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
// booksSchema.pre('save', function(next) {
//     if (this.copies > 0) {
//         this.available = true;  
//     } else {
//         this.available = false;
//     }
//     next();
// });
exports.book = (0, mongoose_1.model)('Book', booksSchema);
