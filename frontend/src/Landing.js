import React, { useEffect, useState } from "react";

export default function Landing() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4567/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📚 Your Book List</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "60%" }}>
        <thead>
          <tr><th>Title</th><th>Author</th></tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={idx}><td>{book.title}</td><td>{book.author}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
