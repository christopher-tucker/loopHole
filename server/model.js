const db = require('../database/sqliteIndex.js');


const getSession = async (sessionId) => {
  try {
    let sessionData = await db.getSessionById(sessionId);
    console.log('about to return session data from model: ', sessionData);
    return sessionData;
  } catch(err) {
    console.log('error trying to call db.getSessionById: ', err);
    return err;
  }
};

const createSession = async (sessionData) => {
  return db.addSession(sessionData)
  .then((result) => {
    console.log('result from calling db.addSession(sessionData): ', result);
    return result;
  })
  .catch((err) => {
    console.log('error in model.createSession: ', err);
    return err;
  });
};

const updateSession = async (sessionData) => {
  const { sessionId } = sessionData;
  return db.editSession(sessionData)
  .then((result) => {
    console.log('result from calling db.editSession(sessionData): ', result);
    return result;
  })
  .then(() => {
    return db.getSessionById(sessionId)
  })
  .then((queryResult) => {
    return queryResult[0];
  })
  .catch((err) => {
    console.log('error calling db.editSession(sessionData): ', err);
    return err;
  });
};

const deleteSession = async (sessionId) => {
  try {
    let deleteQuery = await db.deleteSessionById(sessionId);
    console.log('deleteQuery result: ', deleteQuery);
    return deleteQuery;
  } catch(err) {
    console.log('error deleting session: ', err);
    return err;
  }
};

const addTwo = (num) => {
  return num + 2;
};


module.exports = {
  getSession,
  createSession,
  updateSession,
  deleteSession,
  addTwo
};
