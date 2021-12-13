const chatRoom = require('../models/chatRoom');

/**
 * @param {String} userId - id of user
 * @return {Array} array of all chatroom that the user belongs to
 */
exports.getChatRoomsByUserId = async (userId) => {
  try {
    const rooms = await chatRoom
      .find({ userIds: { $all: [userId] } })
      .populate({
        path: 'userIds',
        model: 'User',
        select: '_id role firstName lastName city',
      })
      .lean();
    return rooms;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} roomId - id of chatroom
 * @return {Object} chatroom
 */
exports.getChatRoomByRoomId = async (roomId) => {
  try {
    const room = await chatRoom.findOne({ _id: roomId });
    return room;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {Array} userIds - array of strings of userIds
 * @param {String} chatInitiator - user who initiated the chat
 * @param {CHAT_ROOM_TYPES} type
 */
exports.initiateChat = async (userIds, type, chatInitiator) => {
  try {
    const availableRoom = await chatRoom.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await chatRoom.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    console.log('error on start chat method', error);
    throw error;
  }
};
