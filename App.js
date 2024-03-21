// App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data.items);
      setError(null);
    } catch (error) {
      setError('Error fetching books. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Book Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter book title"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book">
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
