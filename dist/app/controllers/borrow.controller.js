"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const bookData = yield book_model_1.book.findById(bookId);
        if (!bookData) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        else if (bookData.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available',
            });
        }
        else if (bookData && bookData.copies > 0 && bookData.copies >= quantity) {
            const updatedCopies = yield book_model_1.book.findByIdAndUpdate(bookId, { $inc: { copies: -quantity } }, { new: true });
            if (updatedCopies) {
                const borrowRecord = yield borrow_model_1.borrow.create({
                    book: bookId,
                    quantity,
                    dueDate
                });
                res.status(201).json({
                    success: true,
                    message: 'Borrow record created successfully',
                    data: borrowRecord
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
}));
exports.borrowRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrows = yield borrow_model_1.borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id", // _id is the book ObjectId
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            { $unwind: "$bookDetails" },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);
        res.json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrows
        });
    }
    catch (error) {
        console.error('Error fetching borrow records:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}));
