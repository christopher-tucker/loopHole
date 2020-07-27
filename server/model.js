

let sessions = {
  '1234': {
    sessionId: '1234',
    videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
    loopStart: "89",
    loopEnd: "97",
    currentSpeed: "0.8"
  }
};

const getSession = async (sessionId) => {
  return sessions[sessionId];
};

const createSession = async (sessionData) => {
  let { sessionId } = sessionData;
  sessions[sessionId] = sessionData;
  return `successfully added session`;
};

const updateSession = async (sessionData) => {
  let { sessionId } = sessionData;
  sessions[sessionId] = sessionData;
  return `successfully edited session`;
};

const deleteSession = async (sessionId) => {
  delete sessions[sessionId];
  return 'successfully deleted session';
};


module.exports = { getSession, createSession, updateSession, deleteSession };
