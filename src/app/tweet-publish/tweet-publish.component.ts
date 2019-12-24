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

    @Input() tweetData = { };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        //this.tweetData.priority='2'; //default para el option
        //this.tweetData.author = 'cvaldex@gmail.com';
    }

    publishTweet() {

        this.tweet.publishTweet(this.tweetData).subscribe((result) => {
            console.log("Result: " + result);
            this.router.navigate(['/tweet-publish-success/'+result.resultsFound]);
        }, (err) => {
            console.log("Error: " + err.message);
            this.someError = true;
            this.errorMessage = err.message;
        });
    }
}
