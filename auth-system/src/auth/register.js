const path = require('path');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../utils/db');
const sendMail = require('../utils/mail');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Введіть email і пароль' });

  const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) return res.status(409).json({ error: 'Email вже існує' });

  const hash = await bcrypt.hash(password, 10);
  const token = uuidv4();

  await pool.query(
    'INSERT INTO users (email, password, verification_token) VALUES ($1, $2, $3)',
    [email, hash, token]
  );

  await sendMail(email, token);

  res.json({ message: 'Реєстрація успішна. Перевірте пошту для підтвердження.' });
};
