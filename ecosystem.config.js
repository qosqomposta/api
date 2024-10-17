module.exports = {
    apps: [
        {
            name: 'nestjs-app',
            script: 'dist/main.js',
            instances: 'max', // Adjust according to your server
            exec_mode: 'cluster',
            watch: false,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
