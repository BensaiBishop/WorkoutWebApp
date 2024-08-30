require('dotenv').config();

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

// Logging MiddleWare
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Request Body:', req.body);
  next();
})

//Routes
app.use('/api',router);

// Authenticate database connection
sequelize.authenticate()
  .then(() => {
    console.log(`
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      Database connected successfully.
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      `);

    // Sync the database
    db.sequelize.sync().then(() => {
      console.log(`
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Database synced successfully.
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        `);
    }).catch(error => {
      console.error(`
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Database sync failed:`, error,
       '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    });

    // Start server
    app.listen(port, () => {
      console.log(`
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      API listening at http://localhost:${port}
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        `);
    });

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1); // Exit process if unable to connect to the database
  });


