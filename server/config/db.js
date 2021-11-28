const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    const url = `${process.env.DATABASE}?authSource=admin`;
    await mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log('DB Online');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  dbConnection,
};
