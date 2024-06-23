import Ecommerce from '../controllers/product.controller.js';
import errorHandler from '../controllers/error.controller.js';

// Create a new user
const create = async (req, res) => {
  const user = new Ecommerce(req.body);
  try {
    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// List all users
const list = async (req, res) => {
  try {
    let users = await Ecommerce.find().select('name email updated created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Middleware to fetch user by ID
const userByID = async (req, res, next, id) => {
  try {
    let user = await Ecommerce.findById(id);
    if (!user)
      return res.status(400).json({ error: 'User not found' });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Could not retrieve user' });
  }
};

// Read user profile
const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  res.json(req.profile);
};

// Update user profile
const update = async (req, res) => {
  let user = req.profile;
  user = extend(user, req.body);
  user.updated = Date.now();
  try {
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// Delete user profile
const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, userByID, read, list, remove, update };
