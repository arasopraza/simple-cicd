const Hapi = require('@hapi/hapi');
require('dotenv').config();

const createServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0'
    });

    server.route([
        {
            method: 'GET',
            path: '/hello',
            handler: () => {
                return { value: 'Hello DevCoach' };
            },
        },
        {
            method: 'GET',
            path: '/hello/{name}',
            handler: (request) => {
                const { name } = request.params;
                return { value: `Hello ${name}` };
            },
        },
        {
            method: 'GET',
            path: '/hi/{name}',
            handler: (request) => {
                const { name } = request.params;
                return { value: `Hello ${name}` };
            },
        },
    ]);

    return server;
};

if (require.main === module) {
  (async () => {
      const server = await createServer();
      await server.start();
      console.log('Server running on %s', server.info.uri);
  })();
}

module.exports = createServer;