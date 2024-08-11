const express = require('express');
const router = express.Router();
const { registerUser, signinUser, renewToken, checkUserName } = require('../controllers/userController');
const { createWorkout, getWorkouts, editWorkouts, deleteWorkouts } = require('../controllers/exerciseController');

router.post('/register', registerUser);
router.post('/signin', signinUser);
router.post('/createWorkouts', createWorkout);
router.get('/workouts', getWorkouts);
router.post('/renewToken', renewToken)
router.post('/checkuserName', checkUserName);

module.exports = router;