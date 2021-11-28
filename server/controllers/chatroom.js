const {
  createPostInChatRoom,
  getRecentConversation,
  getConversationByRoomId,
  markMessageRead,
} = require('../service/chatMessage');

const {
  initiateChat,
  getChatRoomByRoomId,
  getChatRoomsByUserId,
} = require('../service/chatRoom');

const CHAT_ROOM_TYPES = require('../models/chatRoom');
const makeValidation = require('@withvoid/make-validation');
const { getUserByIds } = require('../service/user');

exports.initiate = async (req, res, next) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        userIds: {
          type: types.array,
          options: { unique: true, empty: false, stringOnly: true },
        },
        type: { type: types.string, options: { enum: CHAT_ROOM_TYPES } },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });

    const { userIds, type } = req.body;
    const { _id: chatInitiator } = req.user;
    const allUserIds = [...userIds, chatInitiator];
    const chatRoom = await initiateChat(allUserIds, type, chatInitiator);
    return res.status(200).json({ success: true, chatRoom });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

exports.postMessage = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        messageText: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json({ ...validation });

    const messagePayload = {
      messageText: req.body.messageText,
    };
    const currentLoggedUser = req.user._id;
    const post = await createPostInChatRoom(
      roomId,
      messagePayload,
      currentLoggedUser
    );
    global.io.sockets.in(roomId).emit('new message', { message: post });
    return res.status(200).json({ success: true, post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};

exports.getRecentConversation = async (req, res, next) => {
  try {
    const currentLoggedUser = req.user._id;
    console.log(req.user._id);
    const options = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10,
    };
    const rooms = await getChatRoomsByUserId(currentLoggedUser);
    const roomIds = rooms.map((room) => room._id);
    const recentConversation = await getRecentConversation(
      roomIds,
      options,
      currentLoggedUser
    );
    return res
      .status(200)
      .json({ success: true, conversation: recentConversation });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error });
  }
};

exports.getConversationByRoomId = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await getChatRoomByRoomId(roomId);
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      });
    }
    const users = await getUserByIds(room.userIds);
    const options = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10,
    };
    const conversation = await getConversationByRoomId(roomId, options);
    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

exports.markConversationReadByRoomId = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const room = await getChatRoomByRoomId(roomId);
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      });
    }

    const currentLoggedUser = req.user._id;
    const result = await markMessageRead(roomId, currentLoggedUser);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};
