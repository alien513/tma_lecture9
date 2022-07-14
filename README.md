# tma_lecture9

<h2>Task:</h2>

Create a simple server for books and reviews using ExpressJS.

<h2>Routes:</h2>

// Receive list of books
GET 	/books
// Receive book by id
GET 	/books/1
// Receive list if reviews
GET 	/books/1/reviews
// Receive review by id
GET 	/books/1/reviews/1
// Create a book
POST 	/books
// Add review for a book
POST 	/reviews
// Edit book title
PATCH 	/books/1
// Delete review by id
DELETE 	/books/1/reviews/1

* Number "1" is provided just as a sample id.