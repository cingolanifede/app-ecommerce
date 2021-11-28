const User = require('../models/user');
const bcrypt = require('bcrypt');
const { signUpSchema } = require('../validations/user.validation');
const { generateToken } = require('../validations/token.validation');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split('@')[0], picture },
    { new: true }
  );
  if (user) {
    console.log('USER UPDATED', user);
    res.json(user);
  } else {
    const newUser = await new User({
      name: email.split('@')[0],
      picture,
    }).save();
    console.log('USER CREATED', newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email }).select('-password');
    if (!user) throw new Error('User not found');
    return res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      return res
        .status(401)
        .send({ error: { validation: false, msg: 'unauthorized' } });
    }
    const token = await generateToken(user);
    user.password = undefined;
    return res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { email, password, firstName, repeatPassword } = req.body;

    await signUpSchema({ email, password, firstName, repeatPassword });

    const user = await User.findOne({ email });
    if (user) res.status(409).send('Email exits');

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).send(createdUser);
  } catch (error) {
    next(error);
  }
};

/******************************* */
exports.logout = async (req, res) => {
  const { email } = req.body;
};
