import WebSocket = require("ws");
import { IObserver } from "./observer/IObserver";
import { Subject } from "./observer/Subject";

export class WSObserver implements IObserver {
    subject: Subject;
    ws: WebSocket;

    constructor(subject: Subject, ws: WebSocket) {
        this.subject = subject;
        this.ws = ws;
        this.subject.attach(this);
    }

    update() {
        this.ws.send(JSON.stringify(this.subject.getState()));
    }
}