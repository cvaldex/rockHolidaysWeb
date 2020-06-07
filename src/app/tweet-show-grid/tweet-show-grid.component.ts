import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { MessageService } from '../services/index';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TweetUpdateComponent } from '../tweet-update/tweet-update.component';
import { GenericPopupComponent } from '../generic-popup/generic-popup.component';

@Component({
    selector: 'app-show-grid',
    templateUrl: './tweet-show-grid.component.html',
    styleUrls: ['./tweet-show-grid.component.css']
})

export class TweetShowGrid implements OnInit {
    someError: Boolean = false;
    errorMessage = "";
    subscription: Subscription;
    tweets: [];
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
        }
      });
    }

    updateTweet(index){
      console.log("UPDATE TWEET: " + index);
      console.log(this.tweets[index]);
      
      let dialogRef = this.dialog.open(TweetUpdateComponent, {data: this.tweets[index]});

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog cerrado");
        console.log(this.tweets[index]);
      }); 
    }

    deleteTweet(index: string){
      console.log("DELETE TWEET: " + index);
      console.log(this.tweets[index]);

      
      var popupData = {
          windowMessage : "Borrar registro",
          popupMessage : "¿Estás seguro de borrar el registro " + this.tweets[index].id + "?",
          actionButtonMessage: "Borrar",
          cancelButtonMessage: "Cancelar",
          showCancelButton: true
      };

      let dialogRef = this.dialog.open(GenericPopupComponent, {data: popupData});

      dialogRef.afterClosed().subscribe(result => {
          console.log("Botón presionado: " + result);

          if(result == "action"){
            this.deleteTweetServiceCall(index)
          }
      });
    }

    private deleteTweetServiceCall(index: string){
      console.log("Llamar al servicio de borrado con id: " + this.tweets[index].id);

      this.tweet.deleteTweetById(this.tweets[index].id).subscribe((result) => {
        //Quitar el registro de la vista.
        this.tweets.splice(parseInt(index) , 1);
        this.tweetsLength = this.tweets.length;
        
        //mostrar mensaje de éxito
        var popupData = {
          windowMessage : "Borrar registro",
          popupMessage : "Registro borrado correctamente",
          actionButtonMessage: "Aceptar",
          showCancelButton: false
        };

        let dialogRef = this.dialog.open(GenericPopupComponent, {data: popupData});
      }, (err) => {
        console.log("Error borrando el tweet " + err.message);
    });


    }

    ngOnInit() {}
}
