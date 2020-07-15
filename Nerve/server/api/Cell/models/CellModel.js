/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
  title: { type: String, required: true, unique: false },
  author: { type: String, required: true, unique: false },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Book', bookModel);

/**
 * @swagger
 *  components:
 *    schemas:
 *      Book:
 *        type: object
 *        required:
 *          - title
 *          - author
 *        properties:
 *          title:
 *            type: string
 *            description: title of the book.
 *          author:
 *            type: string
 *            description: author of the book.
 *          category:
 *            type: object
 *            description: category of the book.
 *          read:
 *            type: boolean
 *            description: a flag to indicate if the book has been read or not
 *        example:
 *           title: Restful API
 *           author: Trung Huynh
 *           category: {}
 *           read: 0
 */
