import { Component, OnInit, Input, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { TweetService } from '../tweet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
    errorMessage = "";
    MAX_FILE_SIZE: Number = 5242880;
    public priorities:Array<string> = ['0', '1', '2', '3', '4'];
    tweetId = "";
    
    newTweetForm: NgForm;
    inputFile;

    @Input() tweetData = { text:'', date: '', author: '', priority: '', image1: '', image2: '', image3: '', image4: '' };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router) { }

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

        //console.log(this.imagesToUpload);

        this.tweet.addTweet(this.tweetData).subscribe((result) => {
            console.log("Result: " + result);
            //this.router.navigate(['/tweet-add-success/'+result.id]);
            this.tweetId = result.id;
            this.success = true;
        }, (err) => {
            console.log("Error--->" + err.message);
            this.someError = true;
            this.errorMessage = err.message;
        });
    }

    handleMultipleFileInput(files: FileList, event: Event) {
        console.log("handleFileInput: File set length: " + files.length);
        //console.log(event.srcElement);
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
        if(alertType == 'success'){
            this.success = false;

            this.cleanForm();
        }
        else{
            if(alertType == 'error'){
                this.someError = false;
            }
        }
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

        //this.imagesToUpload.nativeElement.value = "";
        this.inputFile.value = "";
        this.newTweetForm.resetForm();
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
