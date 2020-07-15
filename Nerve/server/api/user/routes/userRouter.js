const express = require('express');
const UserController = require('../controllers/userController');
const Auth = require('../../../auth/auth');

function Routes(User) {
  const controller = new UserController(User);
  const userRouter = express.Router();
  const userAuth = new Auth(User);
  const checkUser = [userAuth.decodeToken(), userAuth.getFreshUser()];

  /**
   * @swagger
   * tags:
   *   name: Users
   *   description: User management
   */

  /**
   * @swagger
   * path:
   *  /users/me:
   *    get:
   *      summary: Get my own user
   *      tags: [Users]
   *      security:
   *        - bearerAuth: []
   *      responses:
   *        "200":
   *          description: a User schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *        "401":
   *          description: Invalid token
   */
  userRouter.get('/me', checkUser, controller.me);

  userRouter.use('/:Id', controller.getByIdMiddleware);

  /**
   * @swagger
   * path:
   *  /users/:
   *    get:
   *      summary: Get all users
   *      tags: [Users]
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: query
   *          name: username
   *          schema:
   *            type: string
   *          description: Name you want users to match
   *      responses:
   *        "200":
   *          description: An array of users
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *        "401":
   *          description: Invalid token
   *    post:
   *      summary: Create a new user
   *      tags: [Users]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *            type: object
   *            properties:
   *              username:
   *                type: string
   *              password:
   *                type: string
   *          required:
   *            - username
   *            - password
   *      responses:
   *        "201":
   *          description: A User schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *        "400":
   *          description: username is required and password is required
   *        "401":
   *          description: Invalid token
   */
  userRouter
    .route('/')
    .post(controller.post)
    .get(checkUser, controller.get);

  /**
   * @swagger
   * path:
   *  /users/{userId}:
   *    get:
   *      summary: Get a specific user by Id
   *      tags: [Users]
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: userId
   *          schema:
   *            type: string
   *          required: true
   *          description: Id of the user
   *      responses:
   *        "200":
   *          description: a User schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *        "401":
   *          description: Invalid token
   *    put:
   *      summary: replace an existing user by a new user
   *      tags: [Users]
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: userId
   *          schema:
   *            type: string
   *          required: true
   *          description: Id of the user
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *            type: object
   *            properties:
   *              username:
   *                type: string
   *              password:
   *                type: string
   *          required:
   *            - username
   *            - password
   *      responses:
   *        "201":
   *          description: A User schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *        "401":
   *          description: Invalid token
   *    patch:
   *      summary: update an existing user with new fields. Only provided fields in request body will be updated.
   *      tags: [Users]
   *      security:
   *        - bearerAuth: []
   *      parameters:
   *        - in: path
   *          name: userId
   *          schema:
   *            type: string
   *          required: true
   *          description: Id of the user
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *      responses:
   *        "201":
   *          description: A User schema
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/User'
   *        "401":
   *          description: Invalid token
   */
  userRouter
    .route('/:Id')
    .get(checkUser, controller.getById)
    .put(checkUser, controller.put)
    .patch(checkUser, controller.patch);

  return userRouter;
}

module.exports = Routes;
