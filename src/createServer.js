const Hapi = require('@hapi/hapi');
require('dotenv').config();

const createServer = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    });

    server.route([
        {
            method: 'GET',
            path: '/hello',
            handler: () => {
                return { value: 'Hello World' };
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