const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, {
    timestamps: true
});

var Products = mongoose.model('Product', productSchema);

module.exports = Products;