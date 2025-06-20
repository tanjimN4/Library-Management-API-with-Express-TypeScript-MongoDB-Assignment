import express, { Request, Response } from 'express';
import { borrow } from '../models/borrow.model';
import { book } from '../models/book.model';
export const borrowRouter = express.Router();

borrowRouter.post('/', async (req: Request, res: Response, next) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const bookData = await book.findById(bookId);
        if (!bookData) {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        } else if (bookData.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available',
            });
        } else if (bookData && bookData.copies > 0 && bookData.copies >= quantity) {
            const updatedCopies = await book.findByIdAndUpdate(bookId, { $inc: { copies: -quantity } }, { new: true });
            if (updatedCopies) {
                const borrowRecord = await borrow.create({
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
    } catch (error) {
        next(error);
    }
});

borrowRouter.get('/', async (req: Request, res: Response) => {
    try {
        const borrows = await borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
                }
            },
            {
                $lookup: {
                    from: "books",            
                    localField: "_id",        // _id is the book ObjectId
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
    } catch (error) {
        console.error('Error fetching borrow records:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

