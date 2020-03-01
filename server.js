const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');
const app = express();

// Load .env config file

dotenv.config()

// Database

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser : true, useUnifiedTopology: true} )
  .then(() => console.log('La conexión a la base de datos ha sido establecida.'))
  .catch(err => console.error(err));

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes

const GroupRoutes = require('./app/routes/GroupRoutes');
const UserRoutes = require('./app/routes/UserRoutes');
const AuthenticationRoutes = require('./app/routes/AuthenticationRoutes');
const SubjectRoutes = require('./app/routes/SubjectRoutes');
const ActivityRoutes = require('./app/routes/ActivityRoutes');

app.use('/api/group', GroupRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/auth', AuthenticationRoutes);
app.use('/api/subject', SubjectRoutes);
app.use('/api/activity', ActivityRoutes);

// Start Server

app.listen(3000, () => console.log('El servidor ha sido inicializado en el puerto 3000...'));