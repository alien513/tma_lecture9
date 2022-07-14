import express from 'express';
import { BOOKS } from '../db.js';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    const bookId = req.params.bookId;
    const book = BOOKS.find((bk) => bk.id == bookId);
    if (!book.reviews) {
      return res.status(404).json({ message: `This book (id: ${bookId}) has no reviews.`,
      });
    }
    return res.json(book.reviews);
  })

router.get('/:reviewId', (req, res) => {
    const bookId = req.params.bookId;
    const book = BOOKS.find((bk) => bk.id == bookId);
    const reviewId = req.params.reviewId;
    const review = book.reviews.find((rw) => rw.id == reviewId);
    if (!review) {
      return res.status(404).json({ message: `Error: No such review (id: ${bookId}) for this book (id: ${reviewId}).`,
      });
    }
    res.json(review);
  });

router.post('/', (req, res) => {
    const bookId = req.params.bookId;
    const book = BOOKS.find((bk) => bk.id == bookId);
    const review = {
      id: book.reviews.length + 1,
      comment: req.body.comment,
    };
    if (!review.comment) {
      return res.status(400).json({ message: 'Error: Empty review.' });
    }
    book.reviews.push(review);
    return res.json(book.reviews);
  });

router.delete('/:reviewId', (req, res) => {
    const bookId = req.params.bookId;
    const book = BOOKS.find((bk) => bk.id == bookId);
    const reviewId = req.params.reviewId;
    const reviewIndex = book.reviews.findIndex((rw) => rw.id == reviewId);
    if (reviewIndex === -1) {
      return res.status(400).json({ message: `Error: No such review (id: ${bookId}) for this book (id: ${reviewId}).`,
      });
    }
    book.reviews.splice(reviewIndex, 1);
    return res.json(book.reviews);
  });

export { router };