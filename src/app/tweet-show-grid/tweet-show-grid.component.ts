import { Component, OnInit, Input } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
import { MessageService } from '../services/index';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { TweetUpdateComponent } from '../tweet-update/tweet-update.component';
import { GenericPopupComponent } from '../generic-popup/generic-popup.component';
import { ImageGallery } from '../images/image-gallery/image-gallery.component';

import {RepeatedWordsUtil} from '../util/repeated-words-util';

@Component({
    selector: 'app-show-grid',
    templateUrl: './tweet-show-grid.component.html',
    styleUrls: ['./tweet-show-grid.component.css']
})

export class TweetShowGrid implements OnInit {
    someError: Boolean = false;
    errorMessage = "";
    subscription: Subscription;
    tweets: any[];
    repeatedWords: string[];
    tweetsLength = 0;
    publishableRecords = 0;

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, private messageService: MessageService, public dialog: MatDialog, private rwu: RepeatedWordsUtil) {
      // subscribe to home component messages
      this.subscription = this.messageService.getMessage().subscribe(message => {
        if (message) {
          console.log("Mensaje recibido: " + message.tweet.length);
          console.log(message);
          this.tweets = message.tweet;
          this.tweetsLength = message.tweet.length;

          this.publishableRecords = this.countPublishableItems(this.tweets);

          //llenar los arreglos con palabras repetidas;
          this.repeatedWords = [];
          this.tweets.forEach(tweet => {
            var text: string = tweet.tweet as string;
            this.repeatedWords.push(this.avoidDuplicates(text));
          });
        }
      });
    }

    avoidDuplicates(text: string){
      var repeateadWords = this.rwu.getRepeatedWords(text);
      var repeatedWordsString = "";

      repeateadWords.forEach(word => {
          repeatedWordsString = repeatedWordsString + " " + word;
      });

      return repeatedWordsString.trim();
    }

    updateTweet(index){
      console.log("UPDATE TWEET: " + index);
      console.log(this.tweets[index]);

      let dialogRef = this.dialog.open(TweetUpdateComponent, {data: this.tweets[index]});

      dialogRef.afterClosed().subscribe(result => {
        console.log("Dialog cerrado");
        console.log(this.tweets[index]);
        this.repeatedWords[index] = this.avoidDuplicates(this.tweets[index].tweet);
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
            this.deleteTweetServiceCall(index);
          }
      });
    }

    showGallery(index: string) {
      var imageGalleryData = {
          id : this.tweets[index].id
      };

      let dialogRef = this.dialog.open(ImageGallery, {data: imageGalleryData});

      dialogRef.afterClosed().subscribe(result => {
          console.log("Closed Image Gallery");
      });
    }

    private deleteTweetServiceCall(index: string){
      console.log("Llamar al servicio de borrado con id: " + this.tweets[index].id);

      this.tweet.deleteTweetById(this.tweets[index].id).subscribe((result) => {
        //Quitar el registro de la vista.
        this.tweets.splice(parseInt(index) , 1);
        this.tweetsLength = this.tweets.length;
        //Borrar el registro de palabras duplicadas
        this.repeatedWords.splice(parseInt(index) , 1);

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

    cloneTweet(index){
      var popupData = {
        windowMessage : "Clonar registro",
        popupMessage : "¿Estás seguro de clonar el registro " + this.tweets[index].id + "?",
        actionButtonMessage: "Clonar",
        cancelButtonMessage: "Cancelar",
        showCancelButton: true
      };

      let dialogRef = this.dialog.open(GenericPopupComponent, {data: popupData});

      dialogRef.afterClosed().subscribe(result => {
          console.log("Botón presionado: " + result);

          if(result == "action"){
            this.cloneTweetServiceCall(index).subscribe((result) => {
              console.log(result);
              //mostrar mensaje de éxito
              var popupData = {
                windowMessage : "Clonar registro",
                popupMessage : "Registro clonado correctamente. Nuevo ID: " + result.id,
                actionButtonMessage: "Aceptar",
                showCancelButton: false
              };

              let dialogRef = this.dialog.open(GenericPopupComponent, {data: popupData});

              var clonedTweet = {
                id : result.id,
                eventdate : this.tweets[index].eventdate,
                tweet : this.tweets[index].tweet,
                priority : this.tweets[index].priority,
                cloned: true
              }

              console.log(clonedTweet);

              this.tweets.splice(index, 0, clonedTweet);
              this.tweetsLength = this.tweets.length;

              var newRepeatedWords = this.repeatedWords[index];
              this.repeatedWords.splice(index , 0 , newRepeatedWords);
            });
          }
      });
    }

    private cloneTweetServiceCall(index: string){
      console.log("Llamar al servicio de clonado con id: " + this.tweets[index].id);

      var id = {
        id: this.tweets[index].id.toString()
      }

      return this.tweet.cloneTweetById(id as any);
    }

    private evaluateForbiddenChars(text: string){
      return (text.includes('“') || text.includes('”') || text.includes('’'));
    }

    //changePublishableState(id: string, publishableState: boolean){
    changePublishableState(index: number){
      //console.log("id: " + id);
      //console.log("publishableState: " + publishableState);
      console.log("ID: " + this.tweets[index].id);
      console.log("is_publishable: " + this.tweets[index].is_publishable);

      var publishableState = {
        id: this.tweets[index].id.toString() ,
        newPublishableState: !this.tweets[index].is_publishable
      }

      this.tweet.updatePublishableState(publishableState).subscribe((result) => {
        //actualizar el registro para visualizar la tabla
        this.tweets[index].is_publishable = publishableState.newPublishableState;
        this.publishableRecords = this.countPublishableItems(this.tweets);
        
        //mostrar mensaje de éxito
        var popupData = {
          windowMessage : "Actualizar estado de publicación",
          popupMessage : "Registro actualizado correctamente",
          actionButtonMessage: "Aceptar",
          showCancelButton: false
        };

        let dialogRef = this.dialog.open(GenericPopupComponent, {data: popupData});
      }, (err) => {
        console.log("Error actualizando el tweet " + err.message);
      });

      
    }

    countPublishableItems(array) {
      return array.filter(item => item.is_publishable === true).length;
    }

    ngOnInit() {}
}
