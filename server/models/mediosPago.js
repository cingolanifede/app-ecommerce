const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const mediosSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
    },
    provider: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('MediosPago', mediosSchema);
