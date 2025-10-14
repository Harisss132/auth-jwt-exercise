import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userRegister = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'email dan password harus diisi' });
    }

    const userExist = await pool`SELECT * FROM users WHERE email = ${email}`;
    if (userExist.length > 0) {
      return res.status(400).json({ message: 'Email sudah dipakai' });
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await pool`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;
    return res.status(201).json({ message: 'Berhasil registrasi' });
  } catch (error) {
    console.error('Gagal registrasi user', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'email dan password harus diisi' });
    }
    const users = await pool`SELECT * FROM users WHERE email = ${email}`;
    const user = users[0];
    if (!user) return res.status(401).json({ message: 'Email tidak terdaftar' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Password Salah' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login Berhasil', token });
  } catch (error) {
    console.error('Gagal login user', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
