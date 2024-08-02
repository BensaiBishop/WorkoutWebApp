const express = require('express');
const router = express.Router();
const { registerUser, signinUser, renewToken } = require('../controllers/userController');
const { createWorkout, getWorkouts } = require('../controllers/exerciseController');

router.post('/register', registerUser);
router.post('/signin', signinUser);
router.post('/createWorkouts', createWorkout);
router.get('/workouts', getWorkouts);
router.post('/renewToken', renewToken)

module.exports = router;