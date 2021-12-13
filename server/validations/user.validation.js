const Joi = require('joi');
const { errorDisplay } = require('../utils/error.handle');
/**
 *
 * @param { email, password, name, repeatPassword } params
 * @returns resolve or reject
 */
exports.signUpSchema = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const schema = Joi.object().keys({
        firstName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required(),
        repeatPassword: Joi.string().required().valid(Joi.ref('password')),
      });

      const value = await schema.validateAsync(params);
      resolve(value);
    } catch (error) {
      reject(errorDisplay(500, error.details[0].message));
    }
  });
};

/**
 *
 * @param { email, password } params
 * @returns resolve or reject
 */
exports.loginSchema = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required(),
      });

      const value = await schema.validateAsync(params);
      resolve(value);
    } catch (error) {
      reject(errorDisplay(500, error.details[0].message));
    }
  });
};
