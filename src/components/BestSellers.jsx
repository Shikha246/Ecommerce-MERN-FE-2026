import React, { useState, useEffect } from 'react';
import "../bestsellers.css";
import {Link} from "react-router-dom";
function BestSellers() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual backend URL or just "/api/products/best-sellers" if using a proxy
    fetch('https://ecommerce-mern-be-2026.vercel.app/api/products/bestsellers')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch best sellers');
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading best sellers:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading our top books...</p>;
  if (books.length === 0) return null; // Hides the section completely if no books have sales yet

  return (
    <section className="best-sellers-section bgColor">
      <h2>Our Best Selling Books</h2>
      
      <div className="books-grid">
       
        {books.map((book) => (
          <Link key={book._id} className="book-card bgColor" to={`/product/${book._id}`}>
            <img src={book.image} alt={book.name} className="book-cover" />
            <h3>{book.name}</h3>
            {/* <p className="author">By {book.publisher}</p> */}
            <p className="price">₹{book.price}</p>
            {/* Optional: You can display the sales count badge to show off its popularity */}
            <span className="sales-badge">Top Seller</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BestSellers;