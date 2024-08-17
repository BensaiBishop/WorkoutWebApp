const express = require('express');
const router = express.Router();
const { registerUser, signinUser, renewToken, checkUserName } = require('../controllers/userController');
const { createWorkout, getWorkouts, editWorkouts, deleteWorkouts } = require('../controllers/exerciseController');

router.post('/register', registerUser);
router.post('/signin', signinUser);
router.post('/checkUserName', checkUserName);
router.post('/renewToken', renewToken)

router.post('/createWorkouts', createWorkout);
router.get('/workouts', getWorkouts);
router.delete('/workouts', deleteWorkouts);
router.put('/workouts', editWorkouts);

module.exports = router;