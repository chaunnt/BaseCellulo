/* eslint-disable func-names */
require('should');
const sinon = require('sinon');
const { describe } = require('mocha');
const BookController = require('../controllers/bookController');

describe('Book Controller Tests:', function() {
  describe('Post', function() {
    it('should not allow an empty title on post', function() {
      // eslint-disable-next-line no-unused-vars
      function Book(book) {
        this.save = () => {};
      }

      const req = {
        body: {
          author: 'Jon'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = new BookController(Book);
      controller.post(req, res);

      res.status
        .calledWith(400)
        .should.equal(true, `Bad Status ${res.status.args[0][0]}`);

      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
