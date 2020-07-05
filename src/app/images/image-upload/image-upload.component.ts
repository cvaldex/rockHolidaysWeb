import { Component, OnInit, Input, Inject } from '@angular/core';
import { ImagesService } from '../../images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

import { Subscription, Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.css']
})

export class ImageUpload implements OnInit {
    uploadedImage: string;
    id: string; //id del registro a actualizar
    imageIndex: string;
    areImageLoaded: Boolean = false; //variable que controla si las imagenes están cargadas o no
    inputFile;
    someError: Boolean = false;
    MAX_FILE_SIZE: Number = 4 * 1024 * 1024; //4MB como máximo
    errorMessage: string;
    reader: FileReader;

    constructor(public imagesService:ImagesService, private route: ActivatedRoute, private router: Router, 
      public dialogRef: MatDialogRef<ImageUpload>, @Inject(MAT_DIALOG_DATA) public data: any,
      private sanitizer: DomSanitizer) {
      
        this.id = this.data.id;
        this.imageIndex = this.data.imageIndex;
        console.log(`Se cargará la imagen ${this.imageIndex} del registro: ${this.id}`);
    }

    handleUploadedImage(files: FileList, event: Event) {
      console.log("handleFileInput: File set length: " + files.length);
      this.inputFile = event.srcElement;
      //Validar que el peso de los archivos es el correcto

      this.someError = false; //resetear para ocultar el label de error
      
      this.reader = new FileReader();

      this.reader.onload = function(e){

        console.log("Archivo cargado");
      }
      
      /*
      Esto se puede mejorar claramente!
      */
      for (var i = 0; i < files.length; i++) {
          if(files.item(i).size >= this.MAX_FILE_SIZE){ //si es mayo que el peso máximo, no continuar el proceso
              this.someError = true;
              this.errorMessage = "La imagen \"" + files.item(i).name + "\" es muy pesada para ser cargada";

              return false;
          }

          this.reader.readAsDataURL(files.item(i));
      }
    }

    /*fillUpdatedImage(){
      this.uploadedImage = this.reader.result.toString().split(",")[1];

      return null;
    }*/

    updateImage(){
      this.uploadedImage = this.reader.result.toString().split(",")[1];

      var dataToUpdate = {
        id: this.id.toString(),
        imageId: this.imageIndex.toString(),
        image : this.uploadedImage
      }
      
      this.imagesService.updateImage(dataToUpdate).subscribe((result) => {
        console.log(result);

        var returnData = {
          action : "updated",
          image : this.uploadedImage
        }
  
        this.dialogRef.close(returnData);
    }, (err) => {
      console.log("Error--->" + err.message);
      this.someError = true;
      this.errorMessage = err.message;
    });

      
    }

    closeDialog(action: string){
      var returnData = {
        action : action,
        image : ""
      }
      
      this.dialogRef.close(returnData);
    }
    
    ngOnInit() {}

    /*
    private addImageToArrayIfIsBase64(input: string) {
      if(this.isBase64(input)){
        this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + input))
      }
    }

    private isBase64(input: string) {
      var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

      return !base64regex.test(input);
    }
    
    */ 
}
