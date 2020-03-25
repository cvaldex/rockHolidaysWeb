import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { SingleTweetMessageService } from '../services/index';

import {Location} from '@angular/common';

@Component({
    selector: 'app-tweet-update',
    templateUrl: './tweet-update.component.html',
    styleUrls: ['./tweet-update.component.css']
})

export class TweetUpdateComponent implements OnInit {
    fileToUpload: File = null;
    reader: FileReader[]  = [];
    MAX_FILE_SIZE: Number = 5242880;

    subscription: Subscription;

    someError: Boolean = false;
    success: Boolean = false;
    errorMessage = "";
    
    public priorities:Array<string> = ['0', '1', '2', '3', '4'];

    @Input() tweetData = { id:'', tweet:'', eventDate: '', author: '', priority: '', image1: '', image2: '', image3: '', image4: '' };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, private singleTweetMessageService: SingleTweetMessageService, private location: Location) { 
        // subscribe to home component messages
      /*this.subscription = this.singleTweetMessageService.getMessage().subscribe(message => {
        if (message) {
          console.log("Mensaje recibido: " + message.tweet.id);
          console.log(message);
          this.tweetData.id = message.tweet.id;
          //this.tweets = message.tweet;
          //this.tweetsLength = message.tweet.length;
        } else {}
      });*/
    }

    ngOnInit() {
        //this.tweetData.priority='2'; //default para el option
        //this.tweetData.author = 'cvaldex@gmail.com';

        const tweetToUpdate = JSON.parse(sessionStorage.getItem('tweetToUpdate'));

        console.log("ID a actualizar" + tweetToUpdate.id);
        //console.log(sessionStorage.tweetToUpdate)
        this.tweetData.id = tweetToUpdate.id.toString();
        this.tweetData.tweet = tweetToUpdate.tweet.trim();
        this.tweetData.eventDate = tweetToUpdate.eventdate.substring(0,10);
        this.tweetData.priority = tweetToUpdate.priority.toString();

        //console.log("ID:" + tweet.id);

        //corregir después
        //this.tweetData.id = "4216";
    }

    updateTweet() {
        /*
        this.tweetData.image1 = this.getFileContent(this.reader[0]);
        this.tweetData.image2 = this.getFileContent(this.reader[1]);
        this.tweetData.image3 = this.getFileContent(this.reader[2]);
        this.tweetData.image4 = this.getFileContent(this.reader[3]);
        */
        this.tweet.updateTweet(this.tweetData).subscribe((result) => {
            console.log("Result: " + result);
            this.success = true;
        }, (err) => {
            console.log("Error--->" + err.message);
            this.someError = true;
            this.errorMessage = err.message;
        });
    }

    hideAlert(){
        this.success = false;
        this.location.back();
    }

    handleMultipleFileInput(files: FileList) {
        console.log("handleFileInput: File set length: " + files.length);

        //Validar que el peso de los archivos es el correcto
        var orderFileList = [];
        this.someError = false; //resetear para ocultar el label de error

        for (var i = 0; i < files.length; i++) {
            if(files.item(i).size >= this.MAX_FILE_SIZE){ //si es mayo que el peso máximo, no continuar el proceso
                this.someError = true;
                this.errorMessage = "La imagen \"" + files.item(i).name + "\" es muy pesada para ser cargada";

                return false;
            }
        }


        for (var i = 0; i < files.length; i++) {
            orderFileList.push(i);
        }

        //Burbuja para ordenar los archivos por fecha de ultima modificación
        var tmpIndex;
        for (var i = 0; i < files.length-1; i++) {
            if(files.item(i).lastModified > files.item(i+1).lastModified){
                tmpIndex = orderFileList[i];
                orderFileList[i] = orderFileList[i+1];
                orderFileList[i+1] = tmpIndex;
            }
        }

        //inicializar el arreglo con 4 elementos vacíos siempre
        this.initFileArray();

        for (var i = 0; i < files.length; i++) {
            this.reader[i].onload = function(e){
                console.log("File readead!!");
            }

            this.reader[i].readAsDataURL(files.item(orderFileList[i]));
        }
    }

    initFileArray(){
        this.reader = [];
        this.reader.push(new FileReader());
        this.reader.push(new FileReader());
        this.reader.push(new FileReader());
        this.reader.push(new FileReader());
    }

    getFileContent(file: FileReader){
        let content: string = "";

        if(file.readyState > 1){
            content = file.result.toString().split(",")[1];
        }

        return content;
    }
}
