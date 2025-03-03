const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategories: [
        {
            name: {
                type: String,
                required: true
            },
            books: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Book'
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Category', categorySchema);
