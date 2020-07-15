module.exports = function routes(route, controller) {
  // add middleware to get user by Id, this user will be then be used by CRUD requests
  route.use('/:Id', controller.getByIdMiddleware);

  route
    .route('/')
    .post(controller.post)
    .get(controller.get);

  route
    .route('/:Id')
    .get(controller.getById)
    .put(controller.put)
    .patch(controller.patch);
};
