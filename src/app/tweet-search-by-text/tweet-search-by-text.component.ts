import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../services/index';

@Component({
    selector: 'app-tweet-search-by-text',
    templateUrl: './tweet-search-by-text.component.html',
    styleUrls: ['./tweet-search-by-text.component.css']
})

export class TweetSearchByText implements OnInit {
    //fileToUpload: File = null;
    //reader: FileReader[]  = [];
    someError: Boolean = false;
    errorMessage = "";
    hasNoRecordsFound: Boolean = false;

    @Output()
    populateGrid = new EventEmitter<string>();

    @Input() searchData = { text:''};

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

    ngOnInit() {
        //this.tweetData.priority='2'; //default para el option
        //this.tweetData.author = 'cvaldex@gmail.com';
        this.searchData.text = "";
    }


    searchTweetByText() {
        this.someError = false;
        if(this.searchData.text.trim().length == 0){
            this.someError = true;
            this.errorMessage = "Ingresa algún texto para buscar";
            return;
        }

        this.hasNoRecordsFound = false;

        this.tweet.searchTweetByText(this.searchData).subscribe((result) => {
            //console.log("Result in search: " + result.length);
            if(result.length == 0){
                this.hasNoRecordsFound = true;
            }

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
