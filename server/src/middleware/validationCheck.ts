import { check } from "express-validator/check";

const user = [
  check('username', 'Username cannot be empty').trim().isLength({ min: 1 }),
  check('address', 'Address cannot be empty').trim().isLength({ min: 1 }),
  // check('phone', 'Invalid Phone number').trim().isNumeric(),
  check('email', 'Invalid Email').isEmail(),
];

const validate = {
  register: user.concat([
    check('password', 'Password must be a least 3 characters').isLength({ min: 3 }),
    check('confirmPassword', 'Passwords should match')
      .exists()
      .custom((value, { req }) => value === req.body.password)
  ]),
  updateUser: user,
  login: [
    check('password', 'Password cannot be empty').isLength({ min: 1 }),
    check('email', 'Invalid Email').isEmail(),
  ],
  product: [
    check('title', 'Title cannot be empty').trim().isLength({ min: 1 }),
    check('description', 'Description cannot be empty').trim().isLength({ min: 1 }),
    check('imageUrl', 'Image Url cannot be empty').trim().isLength({ min: 1 }),
    check('price', 'Price should be a number and greater then zero.').trim().isNumeric().isLength({ min: 1 }).isInt({ gt: 0 }),
  ],
  category: [
    check('category', 'Category cannot be empty').trim().isLength({ min: 1 }),
  ],
  comment: [
    check('content', 'Content cannot be empty').trim().isLength({ min: 1 }),
    // check('rating', 'Content cannot be empty').trim().isNumeric(),
  ],
  orderStatus: [
    check('status').trim().isLength({min: 1}).isNumeric(),
  ],
  order: [
    check('order.*.orderedQuantity', 'Order must have ordered quantity').trim().isNumeric(),
    check('order.*.id', 'Object Incomplete').trim().isNumeric(),
    check('order.*.test', 'Object Incomplete').trim().isNumeric(),
  ]
}

export default validate
