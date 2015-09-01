# toxie
Proxy group video session requests to Tokbox for Air Computing's messaging client.

## Commands
`npm install` to pick up dependencies.

`npm start` to run in development mode (sends output and error messages to different files).

`npm run docker` to run in docker mode (sends all output to a single file).

`npm stop` to kill the server.

## Endpoints
GET http://localhost:8080/token?conversationId=\<client side conversation identifier\>

    returns video chat room api key, session id, and token for a specific conversation