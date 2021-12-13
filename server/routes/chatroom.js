const express = require('express');

const router = express.Router();

// controller
const {
  getRecentConversation,
  getConversationByRoomId,
  getRoomIdByUser,
  initiate,
  postMessage,
  markConversationReadByRoomId,
} = require('../controllers/chatroom');
const { authCheck } = require('../middlewares/auth');

router.get('/room/', authCheck, getRecentConversation);
router.get('/room/chatroom', authCheck, getRoomIdByUser);
router.get('/room/:roomId', authCheck, getConversationByRoomId);
router.post('/room/initiate', authCheck, initiate);
router.post('/room/:roomId/message', authCheck, postMessage);
router.put('/room/:roomId/mark-read', authCheck, markConversationReadByRoomId);

module.exports = router;
