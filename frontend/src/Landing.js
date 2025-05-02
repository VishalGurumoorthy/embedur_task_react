import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:4567';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`${API}/books`).then((res) => {
      const parsed = JSON.parse(res.data);
      setBooks(parsed);
    });
  }, []);

  return (
    <div class="container-fluid" style={{
      backgroundImage: 'url(/bg1.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      margin: 0,
      padding: 0
    }}>
    
      <h1 class="position-absolute top-20 start-20 translate-top text-white  bg-dark">BOOKS @ LIB</h1>
      <div className="col-md-4 position-absolute top-50 start-50 translate-middle
						d-inline-flex flex-column justify-content-center">
      <table class="table table-bordered border-dark table-striped-columns justify-content-center">
      <thead class="thead-dark">
        <tr className="border rounded">
          <th scope="col">Book Name</th>
          <th scope="col">Author</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr> */}
        {books.map((book, i) => (
          <tr key={i} className="border p-2 rounded">
            <td><strong>{book.book}</strong></td> 
            <td>{book.author}</td>
          </tr>
        ))}
        {/* </tr> */}
      </tbody>
      </table>
    </div>
    </div>
  );
}

export default Books;