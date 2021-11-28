const Joi = require('joi');

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
      console.log(error.details[0].message);
      reject({ validation: false, msg: error.details[0].message });
    }
  });
};
