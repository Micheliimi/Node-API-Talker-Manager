const express = require('express');

const router = express.Router();

const { getTalker, setTalker } = require('../fs-utils');

const authMiddleware = require('../middlewares/authMiddleware');
const nameMiddleware = require('../middlewares/nameMiddleware');
const ageMiddleware = require('../middlewares/ageMiddleware');
const talkMiddleware = require('../middlewares/talkMiddleware');
const watchedAtMiddleware = require('../middlewares/watchedAtMiddleware');
const rateMiddleware = require('../middlewares/rateMiddleware');

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

router.post('/', authMiddleware,
  nameMiddleware, ageMiddleware, talkMiddleware,
  watchedAtMiddleware, rateMiddleware, async (req, res) => {
    const { name, age, talk: { watchedAt, rate } } = req.body;

    const talkers = await getTalker();
    const lastIndex = talkers.length - 1;
    const lastTalker = talkers[lastIndex];
    const lastId = lastTalker.id + 1;
    const talker = { id: lastId, name, age, talk: { watchedAt, rate } };
    talkers.push(talker);
    await setTalker(talkers);
    return res.status(201).json(talker);
});

module.exports = router;