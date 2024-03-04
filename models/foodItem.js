const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    options: [String],
    description: String
});

// const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = mongoose.model('foodItem', foodItemSchema);
