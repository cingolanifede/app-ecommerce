const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { ObjectId } = mongoose.Schema;

exports.USER_TYPES = {
  CONSUMER: 'consumer',
  SUPPORT: 'support',
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    coords: {
      type: Object,
      required: false,
    },
    matricula: {
      type: String,
      required: false,
    },
    monotributo: {
      type: String,
      required: false,
    },
    mediosPago: [{ type: ObjectId, ref: 'MediosPago' }],
    type: {
      type: String,
    },
    cart: {
      type: Array,
      default: [],
    },
    wishlist: [{ type: ObjectId, ref: 'Product' }],
  },
  { versionKey: false, timestamps: true, collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
