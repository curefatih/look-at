import { Subject } from "./Subject";

export interface IObserver {
    subject: Subject;
    update: () => void;
}