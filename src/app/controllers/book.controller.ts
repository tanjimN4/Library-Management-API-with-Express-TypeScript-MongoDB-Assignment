import express, { Request, Response } from 'express';
import { book } from '../models/book.model';
export const bookRouters = express.Router();

bookRouters.get('/', async (req: Request, res: Response, next) => {
    try {
        const books = await book.find()
        res.json({
            success: true,
            message: 'Books retrieved successfully',
            data: books
        });
    } catch (error) {
        next(error);
    }
});

bookRouters.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    const bookData = await book.findById(bookId);
    res.json({
        success: true,
        message: 'Book retrieved successfully',
        data: bookData
    });
});

bookRouters.post('/', async (req: Request, res: Response, next) => {
    try {
        const books = await book.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Book added successfully',
            data: books
        });
    } catch (error) {
        next(error);
    }
});
bookRouters.patch('/:bookId', async (req: Request, res: Response,next) => {
    const bookId = req.params.bookId;
    try {
        const updatedBook = await book.findByIdAndUpdate(
            bookId,
            req.body,
            { new: true, runValidators: true }
        );
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook
        });
    } catch (error) {
        next(error);
    }
});

bookRouters.delete('/:bookId', async (req: Request, res: Response, next) => {
    const bookId = req.params.bookId;
    try {
        const deletedBook = await book.findByIdAndDelete(bookId, { new: true });
        if(deletedBook) {
            res.json({
                success: true,
                message: 'Book deleted successfully',
                data: null
            });
        }else {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        
    } catch (error) {
        next(error);
    }
});
