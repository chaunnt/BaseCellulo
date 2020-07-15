function BookController(Book) {
  function getByIdMiddleware(req, res, next) {
    Book.findById(req.params.Id)
      .populate('categories')
      .then(book => {
        if (book) {
          req.book = book;
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
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    book
      .save()
      .then(savedBook => {
        return res.status(201).json(savedBook);
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
    Book.find(query)
      .populate('categories')
      .then(books => {
        const returnBooks = books.map(book => {
          const newBook = book.toJSON();
          newBook.links = {};
          // eslint-disable-next-line no-underscore-dangle
          newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
          return newBook;
        });
        return res.json(returnBooks);
      })
      .catch(err => {
        return next(err);
      });
  }

  function getById(req, res) {
    const returnBook = req.book.toJSON();
    res.json(returnBook);
  }

  function put(req, res, next) {
    const { book } = req;
    Object.keys(book.toJSON()).forEach(key => {
      if (key !== '_id' && key !== '__v') {
        book[key] = req.body[key];
      }
    });

    book
      .save()
      .then(savedBook => {
        return res.json(savedBook);
      })
      .catch(err => {
        return next(err);
      });
  }

  function patch(req, res, next) {
    const { book } = req;

    // eslint-disable-next-line no-underscore-dangle
    if (book.__id) {
      // eslint-disable-next-line no-underscore-dangle
      delete book.__id;
    }

    Object.entries(req.body).forEach(item => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });

    book
      .save()
      .then(savedBook => {
        return res.json(savedBook);
      })
      .catch(err => {
        return next(err);
      });
  }

  function deleteFunc(req, res, next) {
    req.book
      .delete()
      .then(() => {
        res.sendStatus(204);
      })
      .catch(err => {
        return next(err);
      });
  }

  return { getByIdMiddleware, post, get, getById, put, patch, deleteFunc };
}

module.exports = BookController;
