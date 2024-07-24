const { Exercise, User } = require('../models');
const jwt = require('jsonwebtoken');

async function createWorkout(req, res) {
    const {token, exercises } = req.body;

    try {
        const decodedToken = jwt.verify(token, 'letsgrindit');
        const user = await User.findByPk(decodedToken.id);

        if (!user) {
            return res.status(400).json({message: 'User not found. Please log in.'});
        }

        if(!Array.isArray(exercises)) {
            return res.status(400).json({message: 'Invalid exercise format.'});
        }

        for (const exercise of exercises) {
            const newExercise = await Exercise.create({ 
                ...exercise, 
                userId: user.id,
                username: user.username,
                postDate: req.body.postDate
            });
        }

        res.json({ message: 'Exercise created successfully.'});

    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(400).json({ message: 'Invalid token or error creating exercises.' });
    }
}

module.exports = {
    createWorkout
};

