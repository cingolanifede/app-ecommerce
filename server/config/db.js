const mongoose = require('mongoose');
const { configuration } = require('./config')
const dbConnection = async () => {
  try {
    const url = `mongodb://${configuration.mainDatabase.user}:${configuration.mainDatabase.pass}@${configuration.mainDatabase.host}:${configuration.mainDatabase.port}/${configuration.mainDatabase.name}?authSource=admin`
    console.log(url)
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
