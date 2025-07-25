const express = require('express');
const router = express.Router();
const Sleep = require('../models/Sleep');

router.get('/', async (req, res) => {
  const sleeps = await Sleep.find();
  res.json(sleeps);
});

router.post('/', async (req, res) => {
  const newSleep = new Sleep(req.body);
  await newSleep.save();
  res.status(201).json(newSleep);
});

module.exports = router;
