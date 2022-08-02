const express = require('express');

const router = express.Router();

const { getTalker } = require('../fs-utils');

router.get('/', async (req, res) => {
  try {
    const talkers = await getTalker();
    return res.status(200).json(talkers);
  } catch (err) {
    return res.status(200).end([]);
  }
});

module.exports = router;