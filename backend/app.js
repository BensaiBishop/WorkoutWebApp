const express = require('express');
const bodyParser = require('body-parser')
const { sequelize, Exercise } = require('./models')

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/workouts', async (req, res) => {
  try {
    const {currentDate, username, exercises } = req.body;

    const exercisesWithMetaData = exercises.map(exercises => ({
      ...exercises,
      username,
      currentDate,
    }))

    const createdExercises = await Exercise.bulkCreate(exercisesWithMetaData);

    console.log('Workout data received:', data);
    res.status(201).json({ message: 'Workout submitted successfully', data: createdExercises });
  } catch (error) {
    console.log('Error submitting workout:', error);
    res.status(500).json({ message: 'Failed to submit workout' });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
  sequelize.sync();
});