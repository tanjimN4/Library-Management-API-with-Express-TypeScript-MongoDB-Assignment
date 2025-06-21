import express, { Request, Response } from 'express'
import { book } from './app/models/book.model'
import { bookRouters } from './app/controllers/book.controller'
import allErrorHandel from './app/middleware/allErrorHandel'
import { borrowRouter } from './app/controllers/borrow.controller'
const app = express()

app.use(express.json())

// Define routes
app.use('/api/books',bookRouters)

app.use('/api/borrow',borrowRouter)


app.get('/', (req : Request, res : Response) => {
  res.send('Library Management API with Express, TypeScript & MongoDB')
})

//404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
    success: false,
    error: {}
  });
});


// Error handling middleware
app.use(allErrorHandel)







export default app