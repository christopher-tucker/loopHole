const { Sequelize, DataTypes } = require('sequelize');
const config = require('../dev.config.json');

// console.log('from sqlite.js, config.sqlitePath: ', config.sqlitePath);
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.sqlitePath
});

const Sessions = sequelize.define('Sessions', {
    // schema
    sessionId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startTime: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    endTime: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    speed: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
    }, {
        freezeTableName: true
    }
);

const addSession = async (inputObj) => {
    const { videoUrl, startTime, endTime, speed } = inputObj;
    return Sessions.create({ videoUrl, startTime, endTime, speed })
    .catch((err) => {
        console.log('error attempting to add session: ', err);
        return err;
    });
};

const getSessionById = async (id) => {
    return AppPreviewData.findAll({
        where: { "sessionId": id },
        raw: true
    })
    .catch((err) => {
        console.log('error selecting one from AppPreviewData: ', err);
    });
};


const initDb = async () => {
    return sequelize.sync({ force: true })
    .then((result) => {
        console.log('\n========== sqlite database initialized ============\n');
        return result;
    })
    .catch((err) => {
        console.log('error when trying sequelize.sync(): ', err);
        return err;
    });
};

const testConnection = async () => {
    await sequelize.authenticate()
    .then(() => {
      console.log('connection to postgres successful')
    })
    .catch((err) => {
      console.log('there was an error connecting to the postgres database: ', err);
    });
};

module.exports = { initDb, testConnection, addSession, getSessionById };
