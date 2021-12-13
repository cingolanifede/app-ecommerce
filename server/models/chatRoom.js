const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

exports.CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: 'consumer-to-consumer',
  CONSUMER_TO_PROVIDER: 'consumer-to-provider',
  CONSUMER_TO_SUPPORT: 'consumer-to-support',
};

const chatRoomSchema = new mongoose.Schema(
  {
    userIds: [{ type: mongoose.Schema.Types.ObjectId }],
    type: String,
    chatInitiator: String,
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'chatrooms',
  }
);

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
