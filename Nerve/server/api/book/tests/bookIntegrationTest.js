/* eslint-disable func-names */
process.env.NODE_ENV = 'testing';
require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const { describe } = require('mocha');
const app = require('../../../../app');

const Book = mongoose.model('Book');
const User = mongoose.model('User');
const agent = request.agent(app);

describe('Book CRUD Test', function() {
  it('should allow a book to be posted and return read and _id', function(done) {
    const bookPost = {
      title: 'Book Title Test 1',
      author: 'Trung 1'
    };
    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.not.equal(true);
        results.body.should.have.property('_id');
        done();
      });
  });

  // runs after each test in this block
  afterEach(function(done) {
    Book.deleteMany({}).exec();
    User.deleteMany({}).exec();
    done();
  });

  // runs once after the last test in this block
  after(function(done) {
    mongoose.connection.close();
    app.server.close(done());
  });
});
