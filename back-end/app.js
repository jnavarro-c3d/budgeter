const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.get('/api/categories', (req, res, next) => {
  const categories = [
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

  res.status(200).send({
    message: 'Budget categories successfully retrieved',
    categories: categories
  });
})

module.exports = app;
