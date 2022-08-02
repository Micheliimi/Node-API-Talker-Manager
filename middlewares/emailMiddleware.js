const emailMiddleware = (req, res, next) => {
  const { email } = req.body;
  const re = /\S+@\S+\.\S+/;
  const validateEmail = re.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail) {
    return res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = emailMiddleware;