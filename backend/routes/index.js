const express = require('express');
const router = express.Router();
const { registerUser, signinUser } = require('../controllers/userController');
const { createWorkout, getWorkouts } = require('../controllers/exerciseController');

router.post('/register', registerUser);
router.post('/signin', signinUser);
router.post('/createWorkouts', createWorkout);
router.get('/workouts', getWorkouts);

module.exports = router;