import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SemipolarSpinnerModule } from "angular-epic-spinners";

import { MessageService } from '../services/index';

@Component({
    selector: 'app-tweet-search-by-date',
    templateUrl: './tweet-search-by-date.component.html',
    styleUrls: ['./tweet-search-by-date.component.css']
})

export class TweetSearchByDate implements OnInit {
    someError: Boolean = false;
    errorMessage = "";
    hasNoRecordsFound: Boolean = false;
    isLoading = false;

    @Output()
    populateGrid = new EventEmitter<string>();

    @Input() searchData = { date:''};

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) { }

    ngOnInit() {
        this.searchData.date = "";
    }


    searchTweetByDate() {
        if(this.searchData.date.length == 0){
          var today = new Date();

          var month: String = (today.getMonth() + 1).toString();
          var day: String = (today.getDate()).toString();

          month = month.padStart(2, "0");
          day = day.padStart(2, "0");

          this.searchData.date = month + "" + day;
        }
        else{
            if(!this.isValidDate(this.searchData.date)){
                this.someError = true;
                this.errorMessage = "Fecha ingresada no es válida (ddMM): " + this.searchData.date;
                return;
            }
        }
        this.hasNoRecordsFound = false;
        this.someError = false; //limpiar mensaje en caso de múltiples búsquedas

        console.log("Fecha de busqueda: " + this.searchData.date);
        this.isLoading = true;
        console.log("isLoading: " + this.isLoading);
        this.tweet.searchTweetByDate(this.searchData).subscribe((result) => {
            //console.log("Result in search: " + result.length);
            if(result.length == 0){
                this.hasNoRecordsFound = true;
            }
            this.sendMessage(result);
            //this.isLoading = false;
            console.log("true: isLoading: " + this.isLoading);
        }, (err) => {
            console.log("Error--->" + err.message);
            console.log("------------");
            console.log(err);
            this.someError = true;
            this.errorMessage = err.message;
            //this.isLoading = false;
            console.log("false: isLoading: " + this.isLoading);
        });
    }

    sendMessage(message:string): void {
        // send message to subscribers via observable subject
        console.log("Result pre-send: " + message);
        this.messageService.sendMessage(message);
    }

    isValidDate(date:string): boolean{
        var validDate: boolean = false;

        var monthLength = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        if(date.length == 4){
            var month = parseInt(date.substring(0, 2));
            var day = parseInt(date.substring(2, 4));

            if(month >= 1 || month <= 12){
                if(day >= 1 && day <= monthLength[month-1]){
                    validDate = true;
                }
            }
        }

        console.log("Valid Date? :" + validDate);

        return validDate;
    }

}
