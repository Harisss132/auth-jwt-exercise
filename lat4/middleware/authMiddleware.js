const authValidator = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !password || email.trim() === '' || password.trim() === '') {
    return res.status(400).json({ message: 'Email dan password tidak boleh kosong' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Format email tidak valid' });
  }

  next();
};

export default authValidator;
