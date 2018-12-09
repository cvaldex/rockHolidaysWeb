import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-tweet-add',
    templateUrl: './tweet-add.component.html',
    styleUrls: ['./tweet-add.component.css']
})

export class TweetAddComponent implements OnInit {
    fileToUpload: File = null;
    @Input() tweetData = { text:'', date: '', author: '', image1: '', image2: '', image3: '', image4: '' };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {}

    addTweet() {
        this.tweetData.author = 'cvaldex@gmail.com';
        this.tweet.addTweet(this.tweetData).subscribe((result) => {
            this.router.navigate(['/tweet-added/'+result._id]);
        }, (err) => {
            console.log(err);
        });
    }

    handleFileInput(files: FileList , imageId: number) {
        console.log("handleFileInput");
        this.fileToUpload = files.item(0);

        let reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = () => {
            //console.log("File readead!!" + reader.result);
            switch(imageId) {
                case 1: this.tweetData.image1 = reader.result.toString().split(",")[1]; break;
                case 2: this.tweetData.image2 = reader.result.toString().split(",")[1]; break;
                case 3: this.tweetData.image3 = reader.result.toString().split(",")[1]; break;
                case 4: this.tweetData.image4 = reader.result.toString().split(",")[1]; break;
            }
        }
    }
}
