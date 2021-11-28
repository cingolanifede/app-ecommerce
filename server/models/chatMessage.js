const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const MESSAGE_TYPES = {
  TYPE_TEXT: 'text',
};

const readByRecipientSchema = new mongoose.Schema(
  {
    _id: false,
    readByUserId: mongoose.Schema.Types.ObjectId,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, timestamps: true }
);

const chatMessageSchema = new mongoose.Schema(
  {
    chatRoomId: mongoose.Schema.Types.ObjectId,
    message: mongoose.Schema.Types.Mixed,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    postedByUser: mongoose.Schema.Types.ObjectId,
    readByRecipients: [readByRecipientSchema],
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'chatmessages',
  }
);

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
