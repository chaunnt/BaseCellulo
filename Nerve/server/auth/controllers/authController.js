const Auth = require('../auth');

const { signToken } = new Auth();

function AuthController() {
  function signIn(req, res) {
    // req.user will be there from the middleware verify user.
    // Then we can just create a token and send it back for the client to consume
    // eslint-disable-next-line no-underscore-dangle
    const token = signToken(req.user._id);
    return res.json({ token });
  }

  return { signIn };
}

module.exports = AuthController;
