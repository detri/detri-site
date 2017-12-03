const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('react-home');
});

router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
