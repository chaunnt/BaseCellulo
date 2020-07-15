const express = require('express');
const BookController = require('../controllers/bookController');
const Auth = require('../../../auth/auth');

function Routes(Book, User) {
  const bookRouter = express.Router();
  const controller = new BookController(Book);
  const userAuth = new Auth(User);
  const checkUser = [userAuth.decodeToken(), userAuth.getFreshUser()];

  bookRouter.use('/:Id', controller.getByIdMiddleware);

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management
   */

  /**
   * @swagger
   * path:
   *  /books/:
   *    get:
   *      summary: Get all books
   *      tags: [Books]
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: query
   *          name: name
   *          schema:
   *            type: string
   *          description: Name you want books to match
   *        - in: query
   *          name: author
   *          schema:
   *            type: string
   *          description: Author you want books to match
   *        - in: query
   *          name: read
   *          schema:
   *            type: string
   *          description: Read status you want books to match
   *      responses:
   *        "200":
   *          description: An array of books
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Book'
   *        "401":
   *          description: Invalid token
   *    post:
   *      summary: Create a new book
   *      tags: [Books]
   *      security:
   *        - bearerAuth: []
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Book'
   *      responses:
   *        "201":
   *          description: A book schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Book'
   *        "400":
   *          description: Title is required and Author is required
   *        "401":
   *          description: Invalid token
   */
  bookRouter
    .route('/')
    .post(checkUser, controller.post)
    .get(checkUser, controller.get);

  /**
   * @swagger
   * path:
   *  /books/{bookId}:
   *    get:
   *      summary: Get a specific book by Id
   *      tags: [Books]
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: bookId
   *          schema:
   *            type: string
   *          required: true
   *          description: Id of the book
   *      responses:
   *        "200":
   *          description: a Book schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Book'
   *        "401":
   *          description: Invalid token
   *    put:
   *      summary: replace an existing book by a new book
   *      tags: [Books]
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: bookId
   *          schema:
   *            type: string
   *          required: true
   *          description: Id of the book
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Book'
   *            type: object
   *            properties:
   *              title:
   *                type: string
   *              author:
   *                type: string
   *          required:
   *            - title
   *            - author
   *      responses:
   *        "201":
   *          description: A book schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Book'
   *        "401":
   *          description: Invalid token
   *    patch:
   *      summary: update an existing book with new fields. Only provided fields in request body will be updated.
   *      tags: [Books]
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: bookId
   *          schema:
   *            type: string
   *          required: true
   *          description: Id of the book
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Book'
   *      responses:
   *        "201":
   *          description: A book schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Book'
   *        "401":
   *          description: Invalid token
   */
  bookRouter
    .route('/:Id')
    .get(controller.getById)
    .put(controller.put)
    .patch(checkUser, controller.patch);
  return bookRouter;
}

module.exports = Routes;
