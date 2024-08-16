const PROXY_HOST = 'https://localhost:7062/';

const PROXY_CONFIG = [
    {
        context: ['/itk'],
        target: PROXY_HOST,
        secure: false
    },
    ];

    module.exports = PROXY_CONFIG;  