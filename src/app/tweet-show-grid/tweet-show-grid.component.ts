import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { MessageService } from '../services/index';
import { SingleTweetMessageService } from '../services/index';


@Component({
    selector: 'app-show-grid',
    templateUrl: './tweet-show-grid.component.html',
    styleUrls: ['./tweet-show-grid.component.css']
})

export class TweetShowGrid implements OnInit {
    someError: Boolean = false;
    errorMessage = "";
    subscription: Subscription;
    tweets: Observable<any[]>;
    tweetsLength = 0;

    @Input() searchData = { date:''};

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, private singleTweetMessageService: SingleTweetMessageService) {
      // subscribe to home component messages
      this.subscription = this.messageService.getMessage().subscribe(message => {
        if (message) {
          console.log("Mensaje recibido: " + message.tweet.length);
          console.log(message);
          this.tweets = message.tweet;
          this.tweetsLength = message.tweet.length;
        } else {}
      });
    }

    updateTweet(index){
      console.log("UPDATE TWEET: " + index);
      console.log(this.tweets[index]);

      //this.sendMessage(this.tweets[index]);
      sessionStorage.setItem('tweetToUpdate', JSON.stringify(this.tweets[index]));
      //sessionStorage.tweetToUpdate = this.tweets[index];

      this.router.navigate(['/updateTweet']);
    }

    ngOnInit() {
        //this.tweetData.priority='2'; //default para el option
        //this.tweetData.author = 'cvaldex@gmail.com';
        //this.tweets = Observable.empty<Response>();
    }

    sendMessage(message:string): void {
      // send message to subscribers via observable subject
      console.log("Result pre-send: " + message);
      this.singleTweetMessageService.sendMessage(message);
  }
}
