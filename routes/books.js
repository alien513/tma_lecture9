import express from 'express';
import { BOOKS } from '../db.js';
import { router as reviewsRouter } from './reviews.js';

const router = express.Router();

const getBook = (req, res) => {
  const id = req.params.bookId;
  const book = BOOKS.find((bk) => bk.id == id);
  if (book) {
    res.json(book);
  }
  return res.status(404).json({ message: `Error: No such book (id: ${id}).` });
};

router.use('/:bookId/reviews', reviewsRouter);

router.get('/', (req, res) => {
    try {
      res.json(BOOKS);
    } catch (err) {
      res.status(500).json({ message: 'Error: Failed to get books.' });
    }
  });

router.get('/:bookId', getBook);

router.post('/', (req, res) => {
    const book = {
      id: BOOKS.length + 1,
      title: req.body.title,
      reviews: req.body.reviews || [],
    };
    if (!book.title) {
      return res.status(400).json({ message: 'Error: Please specify the book title.' });
    }
    BOOKS.push(book);
    return res.json(BOOKS);
  });

router.patch('/:bookId', (req, res) => {
    const id = req.params.bookId;
    const title = req.body.title;
    if (!title) {
      return res.status(400).json({ message: 'Error: Please specify the book title' });
    }
    BOOKS.find((bk) => bk.id == id).title = title;
    res.json(BOOKS);
  });

export { router };