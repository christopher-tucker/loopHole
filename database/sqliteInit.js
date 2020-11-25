const db = require('./sqliteIndex.js');

const initializeSQLiteDatabase = () => {
  return db.initDb()
    .then((initResult) => {
      console.log('postgres db initialized');
    })
    .catch((err) => {
      console.log('there was an error initializing the db: ', err);
    });
};

initializeSQLiteDatabase();
