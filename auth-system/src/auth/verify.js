const path = require('path');
const pool = require('../utils/db');

module.exports = async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).send('Невірний токен');

  const result = await pool.query(
    'UPDATE users SET email_verified = true, verification_token = NULL WHERE verification_token = $1 RETURNING *',
    [token]
  );

  if (result.rowCount === 0) return res.status(404).send('Токен недійсний або вже використаний');

  res.send('Email підтверджено! Тепер ви можете увійти.');
};
