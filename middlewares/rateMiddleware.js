const rateMiddleware = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (rate === undefined) {
    return res.status(400)
  .json({ message: 'O campo "rate" é obrigatório' });
  }
  const verify = Number(rate) >= 1 && Number(rate) <= 5;
  if (!verify) {
    return res.status(400)
  .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = rateMiddleware;