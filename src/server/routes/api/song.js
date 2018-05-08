const song = require('express').Router();
const db = require('../../models');
const asyncHandler = require('express-async-handler');
const mp3Duration = require('mp3-duration');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid').v4;
const promisify = require('util').promisify;
const passport = require('passport');

const upload = multer({
  dest: '../../public/',
  limits: {
    fieldSize: 20000000,
    fieldNameSize: 500
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.contains('audio/mp3')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

song.get('/:id',
  asyncHandler(async (req, res) => {
    const song = await db.Song.findOne({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({
      ok: true,
      data: song
    });
  }));

song.get('/',
  asyncHandler(async (req, res) => {
    const songs = await db.Song.findAll();
    res.status(200).json({
      ok: true,
      data: songs
    });
  }));

song.post('/',
  upload.single('song'),
  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      next('Unauthorized!');
    }
    let duration;
    const fileName = uuidv4() + '.mp3';
    const savePath = path.join(__dirname, '..', '..', 'public', 'songs', fileName);
    try {
      await writeFile(savePath, req.file.buffer);
      duration = await mp3Duration(req.file.buffer);
    } catch (err) {
      console.log(err);
      next(err);
    }
    const song = await db.Song.create({
      length: duration,
      name: req.body.title,
      user_id: req.user.id,
      filename: fileName,
      url: `/songs/${fileName}`
    });
    res.status(200).json({
      ok: true,
      message: `Your song ${song.name} was successfully uploaded!`
    });
  }));

song.put('/:id',
  asyncHandler(async (req, res) => {
    const song = await db.Song.findOne({
      where: {
        id: req.params.id
      }
    });
    song.name = req.body.name;
    await song.save();
    res.status(200).json({
      ok: true,
      data: song,
      message: 'Song successfully updated!'
    });
  }));

song.delete('/:id',
  asyncHandler(async (req, res, next) => {
    const song = await db.Song.findOne({
      where: {
        id: req.params.id
      }
    });
    const destroyPath = path.join(__dirname, '..', '..', 'public', 'songs', song.url);
    try {
      await unlink(destroyPath, req.file.data);
    } catch (err) {
      console.log(err);
      next(err);
    }
    await song.destroy();
    res.status(200).json({
      ok: true,
      data: song,
      message: 'Song successfully deleted!'
    });
  }));

module.exports = song;
