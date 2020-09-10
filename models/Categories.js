const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var subCateSchema = new Schema({
    sub_cate_id:  {
        type: String,
        required: true
    },
    sub_cate_fullname:  {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const categorySchema = new Schema({
    cate_id:  {
        type: String,
        required: true
    },
    cate_fullname:  {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true
    },
    subcategories:[subCateSchema]
}, {
    timestamps: true
});

var Categories = mongoose.model('Category', categorySchema);

module.exports = Categories;