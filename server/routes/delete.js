const express = require('express');
const router = express.Router();

const {
  deleteRoomById,
  deleteMessageById,
} = require('../controllers/delete.js');

router.delete('/room/:roomId', deleteRoomById);
router.delete('/message/:messageId', deleteMessageById);

module.exports = router;
