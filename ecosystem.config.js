module.exports = {
    apps: [
        {
            name: 'qosqomposta-api',
            script: 'dist/main.js',
            instances: 'max', // Adjust according to your server
            exec_mode: 'cluster',
            watch: true,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
