import { IObserver } from "./observer/IObserver";
import { Subject, StateType } from "./observer/Subject";

export class AppObserver implements IObserver {
    subject: Subject;

    constructor(subject: Subject){
        this.subject = subject;
        this.subject.attach(this);
    }

    pushState(state: StateType){
        this.subject.setState(state);
    }
    
    update(){}

}