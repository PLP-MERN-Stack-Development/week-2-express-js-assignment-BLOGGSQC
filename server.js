// server.js - Express server for Week 2 assignment with all features

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Middleware
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const validateProduct = require('./middleware/validateProduct');
const errorHandler = require('./middleware/errorHandler');

// Custom error classes
const { NotFoundError } = require('./utils/errors');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(bodyParser.json());
app.use(logger);

// Sample in-memory database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false,
  },
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// ✅ GET all products with filtering, search, and pagination
app.get('/api/products', (req, res) => {
  let result = [...products];

  // Search by name (case-insensitive)
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(searchTerm));
  }

  // Filter by category
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedResult = result.slice(startIndex, endIndex);

  res.json({
    total: result.length,
    page,
    limit,
    data: paginatedResult,
  });
});

// ✅ GET product by ID
app.get('/api/products/:id', (req, res, next) => {
  try {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// ✅ POST create product
app.post('/api/products', authenticate, validateProduct, (req, res, next) => {
  try {
    const newProduct = { id: uuidv4(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// ✅ PUT update product
app.put('/api/products/:id', authenticate, validateProduct, (req, res, next) => {
  try {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');
    products[index] = { id: req.params.id, ...req.body };
    res.json(products[index]);
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE a product
app.delete('/api/products/:id', authenticate, (req, res, next) => {
  try {
    const index = products.findIndex((p) => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');
    const deleted = products.splice(index, 1);
    res.json({ message: 'Product deleted', product: deleted[0] });
  } catch (err) {
    next(err);
  }
});

// ✅ GET product statistics (count by category)
app.get('/api/products/stats', (req, res) => {
  const stats = {};
  for (const product of products) {
    stats[product.category] = (stats[product.category] || 0) + 1;
  }
  res.json(stats);
});

// Global error handler (should be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

module.exports = app;
