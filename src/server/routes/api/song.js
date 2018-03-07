const song = require('express').Router();
const db = require('../../models');
const asyncHandler = require('express-async-handler');
const mp3Duration = require('mp3-duration');
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    
  }),
  dest: '../../public/',
  limits: {
    fieldSize: 20000000,
    fieldNameSize: 500
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'audio/mp3') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

song.post('/',
  upload.single('song'),
  asyncHandler(async (req, res) => {
    console.log(req.file);
    console.log(req.files);
    const duration = await mp3Duration(req.file.buffer);
    const song = await db.Song.create({
      length: duration,
      name: req.body.name,
      url: req.file.path
    });
    res.status(200).json({
      ok: true,
      data: song
    });
  }));

module.exports = song;
