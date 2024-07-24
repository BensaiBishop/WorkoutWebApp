const express = require('express');
const router = express.Router();
const { registerUser, signinUser } = require('../controllers/userController');
const { createWorkout, } = require('../controllers/exerciseController');

router.post('/register', registerUser);
router.post('/signin', signinUser);
router.post('/create', createWorkout);

module.exports = router;