// default dev config
const devConfig = {
  "database": {
    "host": "localhost",
    "port": "5432",
    "db": "testdb",
    "user": "postgres",
    "pass": "testpass",
    "dialect": "postgres"
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

module.exports = function() {
  switch(process.env.NODE_ENV) {
    case 'development':
      return devConfig;
    case 'production':
      return prodConfig;
    default:
      return devConfig;
  }
}