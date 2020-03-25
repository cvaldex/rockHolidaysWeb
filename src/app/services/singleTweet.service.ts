import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SingleTweetMessageService {
    private subject = new Subject<any>();

    /*
    sendMessage(message: string) {
        this.subject.next({ text: message });
    }
    */

    sendMessage(tweet) {
        this.subject.next({ tweet });
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
