const { Exercise, User } = require('../models');
const jwt = require('jsonwebtoken');

async function createWorkout(req, res) {
    const {token, exercise } = req.body;

    try {
        const decodedToken = jwt.verify(token, 'letsgrindit');
        const user = await User.findByPk(decodedToken.id);

        if (!user) {
            return res.status(400).json({message: 'User not found. Please log in.'});
        }

        const newExercise = await Exercise.create({ ...exercise, userId: user.id });
        res.json({ message: 'Exercise created successfully.'});

    } catch (error) {
        res.status(400).json({message: 'Invalid token'});
    }
}

module.exports = {
    createWorkout
};

