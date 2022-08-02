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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await getTalker();
    const talker = talkers.find((talk) => talk.id === Number(id));
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
  } catch (err) {
    return res.status(500).end();
  }
});

module.exports = router;