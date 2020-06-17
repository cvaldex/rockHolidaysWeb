import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { ImagesService } from '../images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';



import { Subscription, Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {ImageUpload} from '../image-upload/image-upload.component';

@Component({
    selector: 'app-image-gallery',
    templateUrl: './image-gallery.component.html',
    styleUrls: ['./image-gallery.component.css']
})

export class ImageGallery implements OnInit {
    images: Array<SafeResourceUrl> = new Array(); //arreglo que carga las imagenes
    id: string; //id del registro cargado
    areImagesLoaded: Boolean = false; //variable que controla si las imagenes están cargadas o no
    ACTION_UPDATE_IMAGE: string = "update";
    ACTION_ADD_IMAGE: string = "add";
    
    @ViewChild('loadedImage') loadedImage: ElementRef;

    constructor(public imagesService:ImagesService, private route: ActivatedRoute, private router: Router, 
      public dialogRef: MatDialogRef<ImageGallery>, @Inject(MAT_DIALOG_DATA) public data: any,
      private sanitizer: DomSanitizer, public dialog: MatDialog) {
      
        this.id = this.data.id;
        console.log("Se cargarán imagenes del registro: " + this.id);

        this.imagesService.getImages(this.id).subscribe((result) => {
          console.log(result[0]);

          this.addImageToArrayIfIsBase64(result[0].image1);
          this.addImageToArrayIfIsBase64(result[0].image2);
          this.addImageToArrayIfIsBase64(result[0].image3);
          this.addImageToArrayIfIsBase64(result[0].image4);

          //indicar que las imagenes se cargaron OK
          this.areImagesLoaded = true;

      }, (err) => {
        console.log("Error--->" + err.message);
      });
    }

    private addImageToArrayIfIsBase64(input: string) {
      if(this.isBase64(input)){
        var newImage = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + input)
        this.images.push(newImage);
      }
    }

    private isBase64(input: string) {
      var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

      return !base64regex.test(input);
    }

    updateImage(imageId: string){
      this.updateAddImage(imageId , this.ACTION_UPDATE_IMAGE);
    }

    addImage(){
      this.updateAddImage(this.images.length.toString() , this.ACTION_ADD_IMAGE);
    }

    private updateAddImage(imageId: string, action: string){
      if(action != this.ACTION_UPDATE_IMAGE && action != this.ACTION_ADD_IMAGE){
        return new Error("Invalid image change option!: " + action);
      }
      
      var popupData = {
        id: this.id,
        imageIndex: parseInt(imageId) + 1
      };

      let dialogRef = this.dialog.open(ImageUpload, {data: popupData});

      dialogRef.afterClosed().subscribe(result => {
          console.log(result);

          if(result.action == "updated"){
            if(action == this.ACTION_UPDATE_IMAGE){
              var index = parseInt(imageId);
              //Reemplazar la imagen en la galería actual, tras el ingreso a la BD
              this.images[index] = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + result.image);
            }
            else{
              //Agregar la imagen a la galería actual, tras el ingreso a la BD  
              var newImage = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + result.image);
              this.images.push(newImage);
            }
          }
      });
    }
    
    ngOnInit() {}
}
