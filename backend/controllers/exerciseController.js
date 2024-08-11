const { where } = require('sequelize');
const { Exercise, User } = require('../models');
const jwt = require('jsonwebtoken');

//helper function to validate inputted user data
function validateExercise(exercise) {
    let errors = [];

    if (typeof exercise.exerciseName !== 'string' || exercise.exerciseName.length > 21) {
        errors.push('Invalid exercise name')
    }
    if (exercise.weight !== null && (typeof exercise.weight !== 'number' || exercise.weight < 1 || exercise.weight > 99999)) {
        errors.push('Invalid exercise weight. Must be float between 1 and 99999')
    } else {
        exercise.weight = Math.round(exercise.weight * 100) / 100;
    }
    return errors;
}

//the function called with submitting the workout
async function createWorkout(req, res) {
    const {token, exercises } = req.body;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decodedToken.id);

        if (!user) {
            return res.status(400).json({message: 'User not found. Please log in.'});
        }

        if(!Array.isArray(exercises)) {
            return res.status(400).json({message: 'Invalid exercise format.'});
        }

        for (const exercise of exercises) {
            console.log('Validating exercise:', exercise);
            const errors = validateExercise(exercise);

            if (errors.length !== 0) {
                console.log('Validation errors:', errors);
                return res.status(400).json({ message: 'Invalid exercise data', errors });
            }

            await Exercise.create({ 
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

async function getWorkouts(req,res) {
    try {
        const workouts = await Exercise.findAll();
        res.json(workouts);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch workouts"});
    }
}

async function deleteWorkouts(req,res) {
    const {token, exerciseId} = req.body

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decodedToken.id);

        if (!user) {
            return res.status(400).json({message: 'User not found. Please login'});
        }

        const exercise = await Exercise.findOne({where: {id: exerciseId, userId: user.id}});

        if (!exercise) {
            return res.status(404).json({message: 'Exercise not found in database'});
        }

        await exercise.destroy();
        res.json({message: 'Exercise deleted successfully'});

    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({message: 'Error deleting workout'});
    }
}

async function editWorkouts(req,res) {
    const {token,exerciseId, updates} = req.body;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decodedToken.id);

        if (!user) {
            return res.status(400).json({message: 'User not found. Please login'});
        }

        const exercise = await Exercise.findOne({where: {id: exerciseId, userId: user.id}});

        if (!exercise) {
            return res.status(404).json({message: 'Exercise not found in database'});
        }

        const errors = validateExercise(updates);

        if (errors.length !== 0) {
            return res.status(400).json({message:'Invalid exercise data', errors});
        }

        await exercise.updates(updates);
        res.json({message:'Exercise updated successfully'});
        
    } catch (error) {
        console.error('Error editing workout:', error);
        res.status(500).json({message: 'Error editing workout'});
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    deleteWorkouts,
    editWorkouts,
};

