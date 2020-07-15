const mongoose = require('mongoose');

const { Schema } = mongoose;

const categoryModel = new Schema({
  name: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Category', categoryModel);

/**
 * @swagger
 *  components:
 *    schemas:
 *      Category:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *            description: name of the category.
 *        example:
 *           name: 'NodeJS'
 */
