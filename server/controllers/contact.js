const { sendContactMail } = require('../service/contact');

const sendForm = async (req, res) => {
  try {
    const { email } = req.body;

    // if (!email) throw errorType.requiredFieldMail;

    const data = await sendContactMail(req.body);
    return res.status(200).send({ message: 'successfully sent', data });
  } catch (error) {
    res.status(500).send({ err: err.message, });
  }
};

module.exports = {
  sendForm,
};
