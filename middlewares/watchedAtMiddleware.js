const watchedAtMiddleware = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateFormat = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
  // const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const validateDate = dateFormat.test(watchedAt);
  if (!watchedAt || watchedAt.length === 0) {
    return res.status(400)
  .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!validateDate) {
    return res.status(400)
  .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = watchedAtMiddleware;
