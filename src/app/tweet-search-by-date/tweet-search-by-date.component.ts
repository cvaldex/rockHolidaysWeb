import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../services/index';

@Component({
    selector: 'app-tweet-search-by-date',
    templateUrl: './tweet-search-by-date.component.html',
    styleUrls: ['./tweet-search-by-date.component.css']
})

export class TweetSearchByDate implements OnInit {
    //fileToUpload: File = null;
    //reader: FileReader[]  = [];
    someError: Boolean = false;
    errorMessage = "";

    @Output()
    populateGrid = new EventEmitter<string>();

    @Input() searchData = { date:''};

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

    ngOnInit() {
        //this.tweetData.priority='2'; //default para el option
        //this.tweetData.author = 'cvaldex@gmail.com';
        this.searchData.date = "";
    }


    searchTweetByDate() {
        if(this.searchData.date.length == 0){
          var today = new Date();
          this.searchData.date = (today.getMonth() + 1) + "" + today.getDate();

          if(this.searchData.date.length < 4){
            this.searchData.date = this.searchData.date.padStart(4, "0");
          }
        }

        console.log("Fecha de busqueda: " + this.searchData.date);

        this.tweet.searchTweetByDate(this.searchData).subscribe((result) => {
            console.log("Result in search: " + result.length);
            this.sendMessage(result);
        }, (err) => {
            console.log("Error--->" + err.message);
            this.someError = true;
            this.errorMessage = err.message;
        });
    }

    sendMessage(message:string): void {
        // send message to subscribers via observable subject
        console.log("Result pre-send: " + message);
        this.messageService.sendMessage(message);
    }
}
