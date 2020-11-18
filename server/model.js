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
  console.log('sessionData inside model.createSession: ', sessionData);
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
  let { sessionId } = sessionData;
  sessions[sessionId] = sessionData;
  return `successfully edited session`;
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

// const sample = {
//   sessionId: '',
//   videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
//   startTime: 9.45130497329712,
//   endTime: 20.382307967575073,
//   speed: 0.7
// }
// let sampleOutput = createSession(sample);


module.exports = { getSession, createSession, updateSession, deleteSession, addTwo };
