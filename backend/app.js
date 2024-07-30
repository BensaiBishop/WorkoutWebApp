const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const router = require('./routes/index')
const { sequelize } = require('./models')

const app = express();
const port = process.env.PORT || 3000;

//MiddleWare
app.use(cors());
app.use(express.json());

// Logging MiddleWare, didn't know I hade to add seperate middlware to log
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
})

//Routes
app.use('/api',router);

//Start server
app.listen(port, () => {
  console.log(`
    
    API listening at http://localhost:${port}
    
    `);
  db.sequelize.sync().then(() => {
    console.log('Database Synced');
  }).catch(error => {
    console.error('Database sync failed:', error);
  });
});


