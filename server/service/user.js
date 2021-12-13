const User = require('../models/user');

/**
 * @param {String} firstName
 * @param {String} lastName
 * @returns {Object} new user object created
 */
exports.createUser = async function (body) {
  try {
    const user = await User.create(body);
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
exports.getUserById = async function (id) {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) throw { error: 'No user with this id found' };
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} email, user email
 * @param {String} exclude
 * @return {Object} User profile object
 */
exports.getUserByMail = async function (email, exclude) {
  try {
    const user = await User.findOne({ email }).select(exclude);
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @return {Array} List of all users
 */
exports.getUsers = async function () {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */
exports.getUserByIds = async function (ids) {
  try {
    const users = await User.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
exports.deleteByUserById = async function (id) {
  try {
    const result = await User.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};
