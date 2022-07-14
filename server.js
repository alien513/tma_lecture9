import express from 'express';
import { router as bookRouter } from './routes/books.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/books', bookRouter);
app.listen(port, () => console.log(`Listening on port: ${port}`));