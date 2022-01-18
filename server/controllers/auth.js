const bcrypt = require('bcrypt');
const { signUpSchema, loginSchema } = require('../validations/user.validation');
const { generateToken } = require('../validations/token.validation');
const { getUserByMail, createUser } = require('../service/user');
const { errorHandler, errorDisplay } = require('../utils/error.handle');
const { sendContactMail } = require('../service/contact');

exports.currentUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await getUserByMail(email, `-password`);
    if (!user) throw errorDisplay(404, 'User not found');

    return res.status(200).send({ user });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await loginSchema({ email, password });

    let userLogged = await getUserByMail(email, null);
    if (!userLogged) throw errorDisplay(404, 'User not found');
    if (userLogged.status === 'pending') {
      console.log('Falta validar cuenta')
    }
    const isPasswordMatching = await bcrypt.compare(
      password,
      userLogged.password
    );

    if (!isPasswordMatching) {
      return res
        .status(401)
        .send({ error: { validation: false, msg: 'unauthorized' } });
    }
    const token = await generateToken(userLogged);
    userLogged.password = undefined;

    const { _id, role, type } = userLogged;

    const user = { _id, role, email, type };
    return res.status(200).send({ user, token });
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { email, password, firstName, repeatPassword } = req.body;

    await signUpSchema({ email, password, firstName, repeatPassword });

    const user = await getUserByMail(email);
    if (user) throw errorDisplay(409, 'Email exits');

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await createUser({
      ...req.body,
      password: hashedPassword,
    });
    /**send email */
    await sendContactMail(req.body);

    res.status(200).send(createdUser);
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { email } = req.body;
  } catch (error) {
    return errorHandler(error, res);
  }
};
