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
exports.bookRouters = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRouters = express_1.default.Router();
exports.bookRouters.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sort, sortBy = 'createdAt', limit = 10 } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.book.find(query).sort({ [String(sortBy)]: String(sort) === 'desc' ? 1 : -1 }).limit(Number(limit));
        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouters.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const bookData = yield book_model_1.book.findById(bookId);
    res.json({
        success: true,
        message: 'Book retrieved successfully',
        data: bookData
    });
}));
exports.bookRouters.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.book.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: books
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouters.patch('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const updatedBook = yield book_model_1.book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.bookRouters.delete('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const deletedBook = yield book_model_1.book.findByIdAndDelete(bookId, { new: true });
        if (deletedBook) {
            res.json({
                success: true,
                message: 'Book deleted successfully',
                data: null
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
    }
    catch (error) {
        next(error);
    }
}));
