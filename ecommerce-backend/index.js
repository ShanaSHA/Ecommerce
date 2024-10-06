const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample product data
const products = [
  { id: 1, name: 'Product 1', price: 29.99, image: 'product1.jpg', reviews: [] },
  { id: 2, name: 'Product 2', price: 49.99, image: 'product2.jpg', reviews: [] },
  { id: 3, name: 'Product 3', price: 19.99, image: 'product3.jpg', reviews: [] },
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  res.json(product);
});

// Add a review
app.post('/api/products/:id/reviews', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    product.reviews.push(req.body);
    res.status(201).json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
