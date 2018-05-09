const song = require('express').Router();
const db = require('../../models');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid').v4;
const promisify = require('util').promisify;
const mp3Duration = promisify(require('mp3-duration'));
const isMp3 = require('is-mp3');
const readChunk = require('read-chunk');
const passport = require('passport');

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '../../public/songs'),
    filename: (req, file, cb) => cb(null, uuidv4() + '.mp3')
  }),
  limits: {
    fieldSize: 20000000,
    fieldNameSize: 500
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
    if (!req.file) {
      return next('Problem with multer. req.file is undefined');
    }
    const mime = req.file.mimetype.toLowerCase();
    const chunk = await readChunk(req.file.path, 0, 3);
    if (!(isMp3(chunk) && (mime.includes('audio/mp3') || mime.includes('audio/mpeg')))) {
      await unlink(req.file.path);
      return next('File is not an mp3');
    }
    const duration = await mp3Duration(req.file.path);
    const fileName = req.file.filename;
    const song = await db.Song.create({
      id: uuidv4(),
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
    const destroyPath = path.join(__dirname, '..', '..', 'public', song.url);
    try {
      await unlink(destroyPath);
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