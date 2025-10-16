import pool from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const userRegister = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(userExist.rows.length > 0) {
            return res.status(409).json({ message: 'Email sudah dipakai'});
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);
        return res.status(201).json({ message: 'Berhasil registrasi'})
    } catch (error) {
        console.log('Gagal registrasi user', error);
        return res.status(500).json({ message: 'Internal Server Error'});
    }
}

export const userLogin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = users.rows[0];
        if(!user) return res.status(401).json({ message: 'Email belum terdaftar'});
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({ message: 'Password salah'});
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({ message: 'Login Berhasil', token})
    } catch (error) {
        console.log('Gagal login', error);
        return res.status(500).json({ message: 'Internal Server Error'});
    }
}