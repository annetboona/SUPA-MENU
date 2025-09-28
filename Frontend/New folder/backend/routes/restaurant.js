const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const restaurant = new Restaurant({
      ...req.body,
      owner: req.user._id
    });
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.send(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(restaurant);
  } catch (error) {
    res.status(400).send(error);
  }
});