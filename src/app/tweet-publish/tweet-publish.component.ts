import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-tweet-publish',
    templateUrl: './tweet-publish.component.html',
    styleUrls: ['./tweet-publish.component.css']
})

export class TweetPublishComponent implements OnInit {
    someError: Boolean = false;
    errorMessage = "";
    success: Boolean = false;
    publishedTweets: String = "";

    @Input() tweetData = { };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {}

    publishTweet() {
        this.success = false; //borrar el alert con el mensaje
        this.someError = false; //borrar el alert de error

        this.tweet.publishTweet(this.tweetData).subscribe((result) => {
            console.log(result);
            this.publishedTweets = result.resultsFound;
            this.success = true; //activar el alert de éxito
        }, (err) => {
            console.log("Error: " + err.message);
            console.log(err);
            this.someError = true;
            this.errorMessage = err.error.errorMessage;
        });
    }
}
