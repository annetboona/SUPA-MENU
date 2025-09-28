const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');
const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    cb(undefined, true);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const menuItem = new MenuItem({
      ...req.body,
      image: req.file.buffer,
      restaurant: req.user.restaurant
    });
    await menuItem.save();
    res.status(201).send(menuItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/restaurant/:id', auth, async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurant: req.params.id });
    res.send(menuItems);
  } catch (error) {
    res.status(500).send(error);
  }
});