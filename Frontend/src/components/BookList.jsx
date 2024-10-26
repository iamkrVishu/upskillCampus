import React from "react";

const BookList = () => {
  const books = [
    { title: "Book 1", author: "Author 1" },
    { title: "Book 2", author: "Author 2" },
    { title: "Book 3", author: "Author 3" },
  ];

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
