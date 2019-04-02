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
    MAX_FILE_SIZE: Number = 5242880;

    @Input() tweetData = { text:'', date: '', author: '', priority: '', image1: '', image2: '', image3: '', image4: '' };

    constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {}

    addTweet() {
        this.tweetData.author = 'cvaldex@gmail.com';

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

    /*handleFileInput(files: FileList , imageId: number) {
        console.log("handleFileInput: Largo arreglo archivos: " + files.length);
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
    }*/

    compareFilesByLastModified(a, b) {
        if (a.lastModified < b.lastModified) {
            return -1; console.log("a < b")
        }
        if (a.lastModified > b.lastModified) {
            return 1;console.log("a > b")
        }
        console.log("a = b")
        return 0;
    }

    handleMultipleFileInput(files: FileList) {
        console.log("handleFileInput: File set length: " + files.length);

        var orderFileList = [];

        /*
        for (var i = 0; i < files.length; i++) {
            if(files.item(i).size >= this.MAX_FILE_SIZE){
                //var errorDiv = angular.element(document.getElementById("errorLabel"));
                //errorDiv.class = "visible";
                return false;
            }
        }
        */

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

        console.log("Ordenado OK:" + orderFileList);

        //inicializar el arreglo con 4 elementos vacíos siempre
        this.initFileArray();

        for (var i = 0; i < files.length; i++) {
            //console.log("index: " + i)

            this.reader[i].onload = function(e){
                console.log("File readead!!");
            }

            //console.log("Leyendo:" + orderFileList[i])
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
