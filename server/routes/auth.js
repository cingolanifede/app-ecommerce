const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  createOrUpdateUser,
  currentUser,
  login,
  signUp,
  logout,
} = require('../controllers/auth');

router.post('/login', login);
router.post('/sign-up', signUp);
// router.post("/logout", authCheck, logout);

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.get('/current-user', authCheck, currentUser);
router.get('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;
