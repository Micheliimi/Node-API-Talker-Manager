const authMiddleware = (req, res, next) => {
  // const token = req.headers.authorization;
  // if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  // if (Number(token).length !== 16) return res.status(401).json({ message: 'Token inválido' });
  // next();
  try {
    const { authorization } = req.headers;
    // if (!authorization || authorization.length !== 16) {
    //   // não esqueça de adicionar o return para impedir de que seu código continue.
    //   return res.status(401).json({ message: 'Token inválido' });
    // }
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    } 
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
    return next();
  } catch (error) {
    return res.status(500).end();
  }
};

module.exports = authMiddleware;