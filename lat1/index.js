const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

//Contoh DB sederhana
const users = [];

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email dan Password wajib diisi');

  if (users.find((u) => u.email === email)) {
    return res.status(400).send('Email sudah dipakai');
  }

  const saltRounds = 12;
  const hashed = await bcrypt.hash(password, saltRounds);
  users.push({ email, password: hashed });
  res.status(201).send('Berhasil registrasi');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).send('Invalid Credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send('Invalid Credentials');
  res.json({message: 'Login Berhasil', token: user.password});
});

app.listen(3000, () => {
  console.log('Berjalan di port 3000');
});
