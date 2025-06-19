import express, { Request, Response } from 'express'
const app = express()

app.use(express.json())

// Define a simple route


app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

export default app