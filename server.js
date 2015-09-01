// TODO: api keys somewhere safe

var API_KEY = '45303352',
    API_SECRET = '25d7037d7ce117a0774662caf48f7b1471a1fea7',
    OpenTok = require('opentok'),
    cache = require('./cache'),
    opentok = new OpenTok(API_KEY, API_SECRET),
    restify = require('restify'),
    server = restify.createServer();

// middleware
server.use(restify.CORS());
server.use(restify.queryParser());

// endpoints
var getResponse = function (sessionId) {
    return {
        apiKey: API_KEY,
        sessionId: sessionId,
        token: opentok.generateToken(sessionId)
    }
};

server.get('/token', function respond(req, res, next) {
    var conversationId = req.query.conversationId;
    if (cache.has(conversationId)) {
        var sessionId = cache.get(conversationId).sessionId,
            response = getResponse(sessionId);
        res.send(response);
    } else {
        opentok.createSession(function (err, session) {
            if (err) {
                console.err(err);
                res.send(500);
            } else {
                var sessionId = session.sessionId,
                    response = getResponse(sessionId);
                cache.set(conversationId, {
                    conversationId: conversationId,
                    date: new Date(),
                    sessionId: sessionId
                });
                res.send(response);
            }
        });
    }
});

// TODO: CORS jiggery-pokery

// start server
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});
