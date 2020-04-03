import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { MessageService } from '../services/index';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TweetUpdateComponent } from '../tweet-update/tweet-update.component';

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

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, public dialog: MatDialog) {
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
      //sessionStorage.setItem('tweetToUpdate', JSON.stringify(this.tweets[index]));
      //sessionStorage.tweetToUpdate = this.tweets[index];
      
      //var tweetToUpdate = ;
      let dialogRef = this.dialog.open(TweetUpdateComponent, {data: this.tweets[index]});

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog cerrado");
        console.log(this.tweets[index]);
      });

      
    }

    ngOnInit() {}
}
