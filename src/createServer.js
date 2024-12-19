const Hapi = require('@hapi/hapi');
require('dotenv').config()

const createServer = async () => {
  const server = Hapi.server({
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    port: process.env.PORT,
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
        return { value: `Hello ${name}`};
      },
    },
  ]);

  // Start the server
  await server.start();
  console.log(`Server started at ${server.info.uri}`);

  return server;
};

createServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

module.exports = createServer;