import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { GenericPopupComponent } from '../generic-popup/generic-popup.component';
import { map } from 'rxjs/operators';

import {RepeatedWordsUtil} from '../util/repeated-words-util';

@Component({
    selector: 'app-tweet-add',
    templateUrl: './tweet-add.component.html',
    styleUrls: ['./tweet-add.component.css']
})

export class TweetAddComponent implements OnInit {
    fileToUpload: File = null;
    reader: FileReader[]  = [];
    someError: Boolean = false;
    success: Boolean = false;
    hasRepeatedWords: Boolean = false;
    errorMessage = "";
    repeatedWords = "";
    MAX_FILE_SIZE: Number = 4 * 1024 * 1024; //4MB como máximo
    public priorities:Array<string> = ['0', '1', '2', '3', '4'];
    tweetId = "";
    whiteListWords = [];
    
    newTweetForm: NgForm;
    inputFile;

    @Input() tweetData = { text:'', date: '', author: '', priority: '', image1: '', image2: '', image3: '', image4: '' };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private rwu: RepeatedWordsUtil) { }

    ngOnInit() {
        this.tweetData.priority='2'; //default para el option
        this.tweetData.author = 'cvaldex@gmail.com';
    }

    addTweet(f: NgForm) {
        this.newTweetForm = f;

        this.tweetData.image1 = this.getFileContent(this.reader[0]);
        this.tweetData.image2 = this.getFileContent(this.reader[1]);
        this.tweetData.image3 = this.getFileContent(this.reader[2]);
        this.tweetData.image4 = this.getFileContent(this.reader[3]);

        this.someError = false;
        this.success = false;

        this.tweet.addTweet(this.tweetData).subscribe((result) => {
            console.log("Result: " + result);
            this.tweetId = result.id;
            this.success = true;
            
            this.showOKPopup();

        }, (err) => {
            console.log("Error--->" + err.message);
            this.someError = true;
            this.errorMessage = err.message;
        });
    }

    handleMultipleFileInput(files: FileList, event: Event) {
        console.log("handleFileInput: File set length: " + files.length);
        this.inputFile = event.srcElement;
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

    hideAlert(alertType: string){
        if(alertType == 'error'){
            this.someError = false;
        }
    }

    showOKPopup(){
        var popupData = {
            windowMessage : "Agregar Tweet",
            popupMessage : "Tweet " + this.tweetId + " correctamente ingresado",
            actionButtonMessage: "Aceptar",
            showCancelButton: false
        };

        let dialogRef = this.dialog.open(GenericPopupComponent, {data: popupData});

        dialogRef.afterClosed().subscribe(result => {
            this.cleanForm();
        });
    }

    //limpiar el formulario para subir un nuevo hito
    cleanForm(){
        this.tweetData.date = "";
        this.tweetData.priority = "2";
        this.tweetData.text = "";

        this.tweetData.image1 = "";
        this.tweetData.image2 = "";
        this.tweetData.image3 = "";
        this.tweetData.image4 = "";

        this.inputFile.value = "";
        this.hasRepeatedWords = false;
        this.newTweetForm.resetForm();
        
        //volver la prioridad al valor por defecto
        this.newTweetForm.form.controls['tweetData.priority'].setValue("2");
    }

    /*avoidDuplicates(){
        var words = this.tweetData.text != null ? this.tweetData.text.trim().split(' ') : [];
        //cargar el mapa de palabras con la whitelist inicial
        var allWords = this.getMapWithWhiteListWords();  
        
        this.repeatedWords = "";
        this.hasRepeatedWords = false;

        words.forEach(word => {
            var key = this.getCleanKeyFromWord(word).toLowerCase().trim(); //validate lower or upper case

            if(key.length > 0){
                var value = allWords.get(key);

                value = (typeof value == 'undefined') ? 1 : value + 1;

                allWords.set(key , value);
            }
        });

        for (var key of allWords.keys()) {
            var value = allWords.get(key);
            
            if(value > 1){
                this.hasRepeatedWords = true;
                this.repeatedWords = this.repeatedWords + " " + key;
            }
        }
    }*/

    avoidDuplicates(){
        this.hasRepeatedWords = false;
        this.repeatedWords = "";

        var repeateadWords = this.rwu.getRepeatedWords(this.tweetData.text);
        
        repeateadWords.forEach(word => {
            this.hasRepeatedWords = true;
            this.repeatedWords = this.repeatedWords + " " + word;
        });
    }

    /**
     * Funcion que hace trim y signos de puntuacion que podrían diferenciar entre palabras
     * @param word palabra a limpiar
     */
    getCleanKeyFromWord(word: string){
        var cleanWord = word.trim();

        cleanWord = cleanWord.replace(/,/g, "");
        cleanWord = cleanWord.replace(/\./g, "");
        cleanWord = cleanWord.replace(/;/g, "");
        cleanWord = cleanWord.replace(/'/g, "");
        cleanWord = cleanWord.replace(/"/g, "");

        return cleanWord;
    }

    getMapWithWhiteListWords(){
        var whiteListWordsMap = new Map();

        this.whiteListWords.forEach(word => {
            whiteListWordsMap.set(word.trim() , -1000);
        });

        return whiteListWordsMap;
    }

    // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
     isValidDate(dateString: string){
        // First check for the pattern
        //if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        if(!/^\d{1,2}-\d{1,2}-\d{4}$/.test(dateString))
            return false;

        // Parse the date parts to integers
        var parts = dateString.split("-");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        //if(year < 1000 || year > 3000 || month == 0 || month > 12)
        //    return false;

        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        // Adjust for leap years
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };
}
