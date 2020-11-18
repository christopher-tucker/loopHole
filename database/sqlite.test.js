const model = require('../server/model.js');

test('adds two to the given number', () => {
    expect(model.addTwo(5)).toBe(7);
});

test('expects a session to be added to the sqlite database', async () => {
    const sessionData = {
        videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
        startTime: 0.0,
        endTime: 2.5,
        speed: 0.7
    };
    const result = await model.createSession(sessionData);
    const { sessionId, videoUrl, startTime, endTime, speed, updatedAt, createdAt } = result.dataValues;
    expect(typeof sessionId).toBe('string');
    expect(videoUrl).toBe('https://www.youtube.com/watch?v=aa2C0gf4lls');
    expect(startTime).toBe(0);
    expect(endTime).toBe(2.5);
    expect(speed).toBe(0.7);
    expect(updatedAt).toBeTruthy()
    expect(createdAt).toBeTruthy()
});

test('expects to retrieve an existing session from the database by id', async () => {
    const sessionData = {
        videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
        startTime: 0.0,
        endTime: 2.5,
        speed: 0.7
    };
    const addToDb = await model.createSession(sessionData);
    const { sessionId } = addToDb.dataValues;
    const result = await model.getSession(sessionId)
    let id = result[0]['sessionId'];
    expect(id).toBe(sessionId);
});


test('expects to delete existing session from database', async () => {
    const sessionData = {
        videoUrl: 'https://www.youtube.com/watch?v=aa2C0gf4lls',
        startTime: 0.0,
        endTime: 2.5,
        speed: 0.7
    };
    const addToDb = await model.createSession(sessionData);
    const { sessionId } = addToDb.dataValues;
    const result = await model.deleteSession(sessionId);
    expect(result).toBe(1);
});
