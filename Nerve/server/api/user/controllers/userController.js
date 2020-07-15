function UserController(User) {
  function getByIdMiddleware(req, res, next) {
    User.findById(req.params.Id)
      .then(user => {
        if (user) {
          req.user = user;
          return next();
        }
        return res.status(404).json('Data was not found');
      })
      .catch(err => {
        return next(err);
      });
  }

  // eslint-disable-next-line consistent-return
  function post(req, res, next) {
    const user = new User(req.body);

    user
      .save()
      .then(savedUser => {
        return res.status(201).json(savedUser);
      })
      .catch(err => {
        return next(err);
      });
  }

  function get(req, res, next) {
    const query = {};

    Object.entries(req.query).forEach(item => {
      const key = item[0];
      const value = item[1];
      query[key] = value;
    });

    // noinspection JSUnresolvedFunction
    User.find(query)
      .then(users => {
        const returnUsers = users.map(user => {
          const newUser = user.toJson();
          newUser.links = {};
          // eslint-disable-next-line no-underscore-dangle
          newUser.links.self = `http://${req.headers.host}/api/users/${user._id}`;
          return newUser;
        });
        return res.json(returnUsers);
      })
      .catch(err => {
        return next(err);
      });
  }

  function getById(req, res) {
    const returnUser = req.user.toJson();
    res.json(returnUser);
  }

  function put(req, res, next) {
    const { user } = req;
    Object.keys(user.toJson()).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        user[key] = req.body[key];
      }
    });

    user
      .save()
      .then(savedUser => {
        return res.json(savedUser);
      })
      .catch(err => {
        return next(err);
      });
  }

  function patch(req, res, next) {
    const { user } = req;

    // eslint-disable-next-line no-underscore-dangle
    if (user.__id) {
      // eslint-disable-next-line no-underscore-dangle
      delete user.__id;
    }

    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      user[key] = value;
    });

    user
      .save()
      .then(savedUser => {
        return res.json(savedUser);
      })
      .catch(err => {
        return next(err);
      });
  }

  function deleteFunc(req, res, next) {
    req.user
      .delete()
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        return next(err);
      });
  }

  function me(req, res) {
    return res.json(req.user.toJson());
  }

  return { getByIdMiddleware, post, get, getById, put, patch, deleteFunc, me };
}

module.exports = UserController;
