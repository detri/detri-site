const db = require('../index.js');

describe('should test CRUD operations on the Session model', () => {
  const testSession = {
    sid: 'test_sid',
    userId: 'linked_user',
    expires: Date.now() + 30000,
    data: 'test_data'
  };

  beforeAll(() => {
    return db.sequelize.sync();
  });

  afterAll(() => {
    return db.sequelize.close();
  });
  
  it('should store a new session', () => {
    return db.Session.create(testSession)
      .then(newSesh => {
        expect(newSesh).toHaveProperty('sid');
        expect(newSesh.sid).not.toBeFalsy();
        expect(newSesh).toHaveProperty('userId');
        expect(newSesh).toHaveProperty('expires');
        expect(newSesh.expires).not.toBeFalsy();
        expect(newSesh).toHaveProperty('data');
      });
  });

  it('should retrieve the session', () => {
    return db.Session.findOne({
      where: testSession
    })
      .then(testSesh => {
        expect(testSesh).toHaveProperty('sid');
        expect(testSesh.sid).not.toBeFalsy();
        expect(testSesh).toHaveProperty('userId');
        expect(testSesh).toHaveProperty('expires');
        expect(testSesh.expires).not.toBeFalsy();
        expect(testSesh).toHaveProperty('data');
      })
  });

  it('should modify the session', () => {
    return db.Session.update({
      data: "this is new data"
    }, {
      where: {
        sid: testSession.sid
      }
    })
      .then(arr => {
        expect(arr[0]).toBe(1);
      });
  });

  it('should destroy the session', () => {
    return db.Session.destroy({
      where: {
        sid: testSession.sid
      }
    })
      .then(destroyed => {
        expect(destroyed).toBe(1);
      });
  })
});