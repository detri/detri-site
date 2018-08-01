// default dev config
const devConfig = {
  "database": {
    "host": "localhost",
    "port": "5432",
    "db": "testdb",
    "user": "postgres",
    "pass": "testpass",
    "dialect": "postgres",
    "storage": ":memory:"
  },
  "email": {
    "username": "noreply",
    "domain": "ded.zone",
    "password": "devemailpass"
  }
};

// set up your own prod config
const prodConfig = Object.assign({}, devConfig);
prodConfig.database.db = "proddb";
prodConfig.database.pass = "prodpass";

const testConfig = Object.assign({}, prodConfig);
testConfig.database.dialect = "sqlite";

module.exports = function() {
  switch(process.env.NODE_ENV) {
    case 'development':
      return devConfig;
    case 'production':
      return prodConfig;
    case 'test':
      return testConfig;
    default:
      return devConfig;
  }
}