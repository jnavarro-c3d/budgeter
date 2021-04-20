const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Category = require('./models/category');

const app = express();

mongoose.connect(
  'mongodb+srv://josiah:vrEyoM0FxKPJfNkg@budgeter.8kxws.mongodb.net/budgeter?retryWrites=true&w=majority'
).then(() => {
  console.log('Connected to database');
}).catch(() => {
  console.log('Failed to connect to database');
});

let categories;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/categories', (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    items: req.body.items
  });
  category.save()
    .then(document => {
      res.status(200).send({message: 'Category added', category: document});
    });
});

app.get('/api/categories', (req, res, next) => {
  Category.find()
    .then(documents => {
      res.status(200).send({
        message: 'Budget categories successfully retrieved',
        categories: documents
      });
    });
});

app.delete('/api/categories/:id', (req, res, next) => {
  Category.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Category deleted"});
  });
});

module.exports = app;
