import jwtAuth from "./middleware/jwtAuth";
import usersController from "./controllers/usersController";
import validationCheck from './middleware/validationCheck';
import validate from './middleware/validate';
import productsController from "./controllers/productsController";
import categoriesController from "./controllers/categoriesController";
import commentsController from "./controllers/commentsController";
import ordersController from "./controllers/ordersController";

export default (app: any) => {

  // users
  app.get('/',
    jwtAuth,
    usersController.getUsers
  );

  app.post('/register',
    validationCheck.register,
    validate,
    usersController.register
  );

  app.post('/login',
    validationCheck.login,
    validate,
    usersController.login
  );

  app.get('/users',
    jwtAuth,
    usersController.getActiveUsers
  );

  app.get('/users/:id',
    jwtAuth,
    usersController.getProfile
  );

  app.get('/users/:id/orders',
    jwtAuth,
    usersController.getUserOrders
  );

  app.put('/users/:id',
    jwtAuth,
    validationCheck.updateUser,
    validate,
    usersController.updateUser
  );

  // products
  app.get('/products',
    jwtAuth,
    productsController.get
  );

  app.get('/products/cart',
    jwtAuth,
    productsController.getProductsInCart
  );

  app.get('/products/:id',
    jwtAuth,
    productsController.getProduct
  );

  // admin
  app.post('/products',
    jwtAuth,
    validationCheck.product,
    validate,
    productsController.create
  );

  app.put('/products/:id',
    jwtAuth,
    validationCheck.product,
    validate,
    productsController.edit
  );

  app.delete('/products/:id',
    jwtAuth,
    productsController.delete
  );

  app.get('/products/:id/categories',
    jwtAuth,
    productsController.getProductWithCategories
  );

  // categories
  app.get('/categories',
    jwtAuth,
    categoriesController.get
  );

  app.post('/categories',
    jwtAuth,
    validationCheck.category,
    validate,
    categoriesController.create
  );

  // comments
  app.post('/products/:id/comments',
    jwtAuth,
    validationCheck.comment,
    validate,
    commentsController.create
  );

  app.get('/products/:id/comments',
    jwtAuth,
    commentsController.get
  );

  // orders
  app.get('/orders',
    jwtAuth,
    ordersController.get
  );

  app.post('/orders',
    jwtAuth,
    validationCheck.order,
    validate,
    ordersController.create
  );

  app.put('/orders/:id/status',
    jwtAuth,
    validationCheck.orderStatus,
    validate,
    ordersController.updateStatus
  );

};