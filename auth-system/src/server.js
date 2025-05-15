require('dotenv').config();

const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const authRoutes = require('./auth/routes');

const app = express();
const port = 3000;

console.log('Static path:', path.join(__dirname, '..', 'public'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Головна сторінка. Спробуйте /auth/register або /auth/login');
});

app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}`);
});
