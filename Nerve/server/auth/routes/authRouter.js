const express = require('express');
const AuthController = require('../controllers/authController');
const Auth = require('../auth');

function Routes(User) {
  const authRouter = express.Router();
  const controller = new AuthController(User);
  const userAuth = new Auth(User);
  /**
   * @swagger
   * tags:
   *   name: Auth
   *   description: Auth management
   */

  /**
   * @swagger
   * path:
   *  /auth/signin/:
   *    post:
   *      summary: Sign in with a user credential
   *      tags: [Auth]
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
   *        "200":
   *          description: A user token string
   *          content:
   *            string:
   *        "400":
   *          description: username is required and password is required
   */
  // before we send back a jwt, lets check the password and username match what is in the DB
  authRouter.post('/signin', userAuth.verifyUser(), controller.signIn);

  return authRouter;
}

module.exports = Routes;
