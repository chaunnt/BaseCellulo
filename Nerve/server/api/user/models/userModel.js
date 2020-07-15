/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  // dont store the password as plain text
  password: {
    type: String,
    required: true
  }
});

userModel.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = this.encryptPassword(this.password);
  return next();
});

userModel.methods = {
  // check the passwords on sign-in
  authenticate(plainTextPwd) {
    return bcrypt.compareSync(plainTextPwd, this.password);
  },
  // hash the passwords
  encryptPassword(plainTextPwd) {
    if (!plainTextPwd) {
      return '';
    }
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainTextPwd, salt);
  },

  toJson() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  }
};

module.exports = mongoose.model('User', userModel);

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - password
 *        properties:
 *          username:
 *            type: string
 *            description: name of the user. This must be unique.
 *          password:
 *            type: string
 *            description: raw password of the user.
 *        example:
 *           username: test12
 *           password: 1223
 */
