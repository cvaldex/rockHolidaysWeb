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
    reader: FileReader[]  = [];
    someError: Boolean = false;
    wrongImageName = "";
    MAX_FILE_SIZE: Number = 5242880;
    public priorities:Array<string> = ['0', '1', '2', '3', '4'];

    @Input() tweetData = { text:'', date: '', author: '', priority: '', image1: '', image2: '', image3: '', image4: '' };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.tweetData.priority='2'; //default para el option
        this.tweetData.author = 'cvaldex@gmail.com';
    }

    addTweet() {


        this.tweetData.image1 = this.getFileContent(this.reader[0]);
        this.tweetData.image2 = this.getFileContent(this.reader[1]);
        this.tweetData.image3 = this.getFileContent(this.reader[2]);
        this.tweetData.image4 = this.getFileContent(this.reader[3]);

        this.tweet.addTweet(this.tweetData).subscribe((result) => {
            console.log(result);
            this.router.navigate(['/tweet-add-success/'+result.id]);
        }, (err) => {
            console.log(err);
        });
    }

    handleMultipleFileInput(files: FileList) {
        console.log("handleFileInput: File set length: " + files.length);

        //Validar que el peso de los archivos es el correcto
        var orderFileList = [];
        this.someError = false; //resetear para ocultar el label de error

        for (var i = 0; i < files.length; i++) {
            if(files.item(i).size >= this.MAX_FILE_SIZE){ //si es mayo que el peso máximo, no continuar el proceso
                this.someError = true;
                this.wrongImageName = files.item(i).name;

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
