process.env.NODE_ENV = 'test';
const db = require('../index.js');

describe('session test', () => {
  const testSession = {
    sid: 'test_sid',
    user_id: 'linked_user',
    expires: Date.now() + 30000,
    data: 'test_data'
  };

  beforeAll(() => {
    return db.sequelize.sync();
  });
  it('should successfully store a new session', () => {
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
  afterAll(() => {
    return db.sequelize.close();
  });
});