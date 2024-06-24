export default () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.APP_PORT, 10) || 3001,
    database: '../../qosqompostaDB.db',
});
