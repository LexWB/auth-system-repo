const express = require('express');
const path = require('path');
const authMiddleware = require('./authMiddleware');
const router = express.Router();
const register = require('./register');
const login = require('./login');
const verify = require('./verify');

router.post('/register', register);
router.get('/verify', verify);
router.post('/login', login);

module.exports = router;

router.get('/me', authMiddleware, (req, res) => {
  res.json({ email: req.user.email });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token'); //Видалити JWT токен, встановивши HTTPOnly куку з терміном дії 0
  res.json({ message: 'Ви вийшли з системи' }); //Повертати повідомлення про успішний вихід
});
