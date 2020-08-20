const { v4: uuidv4 } = require('uuid');


let sessions = {
  '1234': {
    sessionId: '1234',
    videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
    startTime: "89",
    endTime: "97",
    speed: "0.8"
  }
};

const getSession = async (sessionId) => {
  let sessionData = await sessions[sessionId];
  console.log('about to return session data from model: ', sessionData);
  return sessionData;
};

// debug!!
const createSession = async (sessionData) => {
  console.log('sessions: ', sessions);
  console.log('sessionData: ', sessionData);
  if (sessionData.sessionId === '') {
    sessionData.sessionId = uuidv4();
  }
  let id = sessionData.sessionId;
  sessions[id] = sessionData;
  console.log('sessions after add: ', sessions);
  console.log('about to return: ', sessionData);
  return sessionData;
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
