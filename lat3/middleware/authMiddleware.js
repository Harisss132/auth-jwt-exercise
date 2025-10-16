const authValidator = (req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password || email.trim() === '' || password.trim() === '') {
        return res.status(400).json({ message: 'Email dan Password tidak boleh kosong'});
    }

    if(!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ message: 'Format email tidak valid'});
    }

    next();
}

export default authValidator;

app.post('/register', (req, res) => {
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Format email tidak valid' });
  }

  // Lanjutkan proses...
});