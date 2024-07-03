const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Exercise } = require('./models');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./config/database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

db.sequelize.sync().then(()=> console.log('Database Synced'));

//User registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password,10);

  try {
    const newUser = await db.User.create({ username, password: hashedPassword });
    res.json({ message:'User registerd sucessfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//User login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.User.findOne({ where: {username} });
  
  if (!user) {
    return res.status(400).json({ message: 'Invalid Username or Password' })
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid Username or Password' })
  }

  const token = jwt.sign({ id: user.id }, 'letsgrindit', { expiresIn: '1h'});
  res.json({token}); 
})

//Create workouts route
app.post('/workouts', async (req, res) => {
  const { token, exercise } = req.body;

  try {
    const decodedToken = jwt.verify(token, 'letsgrindit');
    const user = await db.User.findByPk(decodedToken.id)

    if (!user) {
      return res.status(400).json({ message: 'User not found, please login'})
    }

    const newExercise = await db.Exercise.create({ ...exercise, userId: user.id });
    res.json({ message: 'Exercise created successfully'})

  } catch (error) {
    res.status(400).json({ message: 'Invalid token'});
  }

});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});