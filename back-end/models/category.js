const mongoose = require('mongoose');

class CategoryItem {
  name;
  items;
}

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  items: { type: {
    name: String,
    budget: Number
    }, required: true }
});

module.exports = mongoose.model('Category', categorySchema);
