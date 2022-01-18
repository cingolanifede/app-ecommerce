const MailRepository = require('../repository/mail.repository');

/**
 * Send mail with body
 * @param {string} body
 */

const sendContactMail = async (body) => {
  await MailRepository.sendMail(body);
};

module.exports = {
  sendContactMail,
};
