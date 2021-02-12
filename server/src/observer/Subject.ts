import { IObserver } from "./IObserver";

export type StateType = { [key: string]: any };

export class Subject {

    private observers: IObserver[] = [];
    private state: StateType = {};

    setState(state: StateType) {
        this.state = state;
        this.notify();
    }

    getState() {
        return this.state;
    }

    attach(observer: IObserver) {
        this.observers.push(observer);
    }

    notify() {
        this.observers.forEach(observer => {
            observer.update();
        });
    }
}