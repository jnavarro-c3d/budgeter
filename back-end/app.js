const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let categories = [
  {
    name: 'Necessities',
    items: [
      {
        name: 'Apartment Rent',
        budget: 1200.00
      },
      {
        name: 'Groceries',
        budget: 300.00
      },
      {
        name: 'Utilities',
        budget: 230.00
      }
    ]
  },
  {
    name: 'Lifestyle',
    items: [
      {
        name: '24 Hour Fitness Membership',
        budget: 41.99
      },
      {
        name: 'YouTube Premium',
        budget: 12.49
      },
      {
        name: 'JetBrains',
        budget: 24.59
      },
      {
        name: 'EveryDollar Plus',
        budget: 10.49
      }
    ]
  },
  {
    name: 'Generosity',
    items: [
      {
        name: 'Tithes',
        budget: 430.00
      }
    ]
  }
];

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
  const category = req.body;
  categories.push(category);
  res.send({
    message: 'New category posted',
    categories: categories
  });
});

app.patch('/api/categories', (req, res, next) => {
  const info = req.body;
  categories[info.index].name = info.name;
  res.status(200).send({
    message: 'Category ' + info.index + ' name changed to ' + info.name,
    categories: categories
  })
});

app.get('/api/categories', (req, res, next) => {
  res.status(200).send({
    message: 'Budget categories successfully retrieved',
    categories: categories
  });
});

module.exports = app;
