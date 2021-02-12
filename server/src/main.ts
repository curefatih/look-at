import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { AppObserver } from './AppObserver';
import { Subject } from './observer/Subject';
import { WSObserver } from './WSObserver';

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const subject = new Subject();
const appObserver = new AppObserver(subject);
app.use((req, res, next) => {
    const { headers, params, query, httpVersion, url } = req;
    appObserver.pushState({
        headers,
        params,
        query,
        httpVersion,
        url
    });
    next();
})

wss.on('connection', (ws: WebSocket) => {
    new WSObserver(subject, ws);
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as any).port}`);
});