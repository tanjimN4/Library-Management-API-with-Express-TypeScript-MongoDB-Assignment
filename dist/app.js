"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const allErrorHandel_1 = __importDefault(require("./app/middleware/allErrorHandel"));
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Define routes
app.use('/api/books', book_controller_1.bookRouters);
app.use('/api/borrow', borrow_controller_1.borrowRouter);
app.get('/', (req, res) => {
    res.send('Library Management API with Express, TypeScript & MongoDB');
});
//404 handler
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found',
        success: false,
        error: {}
    });
});
// Error handling middleware
app.use(allErrorHandel_1.default);
exports.default = app;
