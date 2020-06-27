import { Component, OnInit, Input, Inject } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {RepeatedWordsUtil} from '../util/repeated-words-util';

@Component({
    selector: 'app-tweet-update',
    templateUrl: './tweet-update.component.html',
    styleUrls: ['./tweet-update.component.css']
})

export class TweetUpdateComponent implements OnInit {
    fileToUpload: File = null;
    reader: FileReader[]  = [];
    MAX_FILE_SIZE: Number = 5242880;

    someError: Boolean = false;
    success: Boolean = false;
    errorMessage = "";

    repeatedWords: String = "";
    
    public priorities:Array<string> = ['0', '1', '2', '3', '4'];

    @Input() tweetData = { id:'', tweet:'', eventDate: '', author: '', priority: '', image1: '', image2: '', image3: '', image4: '' };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, 
        public dialogRef: MatDialogRef<TweetUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private rwu: RepeatedWordsUtil) { }

    ngOnInit() {
        const tweetToUpdate = this.data;

        console.log("ID a actualizar" + tweetToUpdate.id);
    
        this.tweetData.id = tweetToUpdate.id.toString();
        this.tweetData.tweet = tweetToUpdate.tweet.trim();
        this.tweetData.eventDate = tweetToUpdate.eventdate.substring(0,10);
        this.tweetData.priority = tweetToUpdate.priority.toString();
        
        //precargar las palabras duplicadas que pueden venir en el tweet guardado
        this.avoidDuplicates();
    }

    avoidDuplicates(){
        this.repeatedWords = "";

        var repeateadWords = this.rwu.getRepeatedWords(this.tweetData.tweet);
        
        repeateadWords.forEach(word => {
            this.repeatedWords = this.repeatedWords + " " + word;
        });
    }

    updateTweet() {
        this.someError = false;
        this.tweet.updateTweet(this.tweetData).subscribe((result) => {
            console.log("Result: " + result);
            this.success = true;

            //actualizar el objeto en sesion que representa al tweet modificado
            this.data.id = this.tweetData.id;
            this.data.tweet = this.tweetData.tweet;
            this.data.eventdate = this.tweetData.eventDate;
            this.data.priority = this.tweetData.priority;
        }, (err) => {
            console.log("Error--->" + err.message);
            this.someError = true;
            this.errorMessage = err.message;
        });
    }

    close() {
        this.dialogRef.close();
    }       

    hideAlert(alertType: string){
        if(alertType == 'success'){
            this.success = false;
        }
        else{
            if(alertType == 'error'){
                this.someError = false;
            }
        }
    }
}
