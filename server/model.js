const { v4: uuidv4 } = require('uuid');
const db = require('./sqliteIndex.js');

// let sessions = {
//   '1234': {
//     sessionId: '1234',
//     videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
//     startTime:  25.77686205340576,
//     endTime: 36.62165708201599,
//     speed: 0.8
//   }
// };

const getSession = async (sessionId) => {
  let sessionData = await db.getSessionById(sessionId);
  sessionData.catch((err) => {
    console.log('error trying to call db.getSessionById: ', err);
    return err;
  })
  console.log('about to return session data from model: ', sessionData);
  return sessionData;
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
  console.log('sessions before delete: ', sessions);
  console.log('about to delete session with id: ', sessionId);
  delete sessions[sessionId];
  console.log('sessions after delete: ', sessions);
  return 'successfully deleted session';
};

const sample = {
  sessionId: '',
  videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
  startTime: 9.45130497329712,
  endTime: 20.382307967575073,
  speed: 0.7
}

let sampleOutput = createSession(sample);

module.exports = { getSession, createSession, updateSession, deleteSession };
