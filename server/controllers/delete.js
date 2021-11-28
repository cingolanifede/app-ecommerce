const ChatRoom = require('../models/chatRoom');
const ChatMessage = require('../models/chatMessage');

exports.deleteRoomById = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoom.remove({ _id: roomId });
    const messages = await ChatMessage.remove({ chatRoomId: roomId });
    return res.status(200).json({
      success: true,
      message: 'Operation performed succesfully',
      deletedRoomsCount: room.deletedCount,
      deletedMessagesCount: messages.deletedCount,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

exports.deleteMessageById = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await ChatMessage.remove({ _id: messageId });
    return res.status(200).json({
      success: true,
      deletedMessagesCount: message.deletedCount,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};
