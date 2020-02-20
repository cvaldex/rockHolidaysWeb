import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-search-by-date-holder',
    templateUrl: './tweet-search-by-date-holder.component.html',
    styleUrls: ['./tweet-search-by-date-holder.component.css']
})

export class TweetSearchByDateHolder implements OnInit {
    //fileToUpload: File = null;
    //reader: FileReader[]  = [];
    someError: Boolean = false;
    errorMessage = "";
    //MAX_FILE_SIZE: Number = 5242880;
    //public priorities:Array<string> = ['0', '1', '2', '3', '4'];

    //cambiar
    @Input() searchData = { date:''};

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        //this.tweetData.priority='2'; //default para el option
        //this.tweetData.author = 'cvaldex@gmail.com';
    }

    populateGridFunction(message) {
        console.log("Mensaje Holder: " + message);
    }
}
