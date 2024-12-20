const createServer = require("./createServer");

describe('Hapi Server', () => {
    let server;

    beforeAll(async () => {
        server = await createServer();
    });

    it('should respond with 200 and payload value "Hello World" when GET /hello', async () => {
        // Action
        const response = await server.inject({
            method: 'GET',
            url: '/hello',
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toBe(200);
        expect(responseJson.value).toBe('Hello DevCoach');
    });

    it('should respond with 200 and payload value "Hello john" when GET /hello/john', async () => {
        // Action
        const response = await server.inject({
            method: 'GET',
            url: '/hello/john',
        });

        // Assert
        const responseJson = JSON.parse(response.payload);
        expect(response.statusCode).toBe(200);
        expect(responseJson.value).toBe('Hello john');
    });
});
