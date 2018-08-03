const db = require('../index.js');

describe('should test CRUD operations on the Song model', () => {

  const testSong = {
    length: 30,
    name: 'Test Song',
    url: '/testdir/testsong.mp3'
  }

  beforeAll(() => {
    return db.sequelize.sync();
  });

  afterAll(() => {
    return db.sequelize.close();
  });

  it('should store a new song', () => {
    return db.Song
      .create(testSong)
      .then(song => {
        expect(song).toHaveProperty('id');
        expect(song).toHaveProperty('number');
        expect(song.number).toBeGreaterThan(0);
        expect(song).toHaveProperty('play_count');
        expect(song.play_count).toBe(0);
        expect(song).toHaveProperty('length');
        expect(song).toHaveProperty('name');
        expect(song).toHaveProperty('url');
      });
  })

  it('should retrieve the song', () => {
    return db.Song.findOne({
      where: {
        name: testSong.name
      }
    })
      .then(song => {
        expect(song).not.toBeNull();
      });
  });

  it('should modify the song', () => {
    let oldName = testSong.name;
    testSong.name = 'Test Song 2';
    return db.Song.update({
      name: testSong.name
    }, {
      where: {
        name: oldName
      }
    })
      .then(arr => {
        expect(arr[0]).toBe(1);
      });
  });

  it('should destroy the song', () => {
    return db.Song.destroy({
      where: {
        name: testSong.name
      }
    })
      .then(destroyed => {
        expect(destroyed).toBe(1);
      });
  });

});