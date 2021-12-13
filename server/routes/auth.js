const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');
const { currentUser, login, signUp, logout } = require('../controllers/auth');

router.post('/login', login);
router.post('/sign-up', signUp);
router.post('/logout', authCheck, logout);
router.get('/current-user', authCheck, currentUser);
router.get('/current-admin', authCheck, adminCheck, currentUser);

module.exports = router;
