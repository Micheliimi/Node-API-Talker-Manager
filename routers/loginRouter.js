const express = require('express');

const router = express.Router();

// const { getTalker, setTalker } = require('../fs-utils');
const generateToken = require('../generateToken');

const emailMiddleware = require('../middlewares/emailMiddleware');
const passwordMiddleware = require('../middlewares/passwordMiddleware');

router.post('/', emailMiddleware, passwordMiddleware, (req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = router;