const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/database');
const router = require('./routes/index')
const { sequelize } = require('./models')

const app = express();
const port = process.env.PORT || 3000;

//MiddleWare
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/',router);

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


