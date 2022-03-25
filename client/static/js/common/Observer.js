export class Observer {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    notify(changedState) {
        this.subscribers.forEach((subscriber) => subscriber.detectChangedState(changedState));
    }
}
