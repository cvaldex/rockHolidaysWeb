import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { ImagesService } from '../../images.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

import { Subscription, Observable } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {ImageUpload} from '../image-upload/image-upload.component';

@Component({
    selector: 'app-image-gallery',
    templateUrl: './image-gallery.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./image-gallery.component.css']
})

export class ImageGallery implements OnInit {
    images: Array<SafeResourceUrl> = new Array(); //arreglo que carga las imagenes
    imagesSizes = [];
    loadedImages = 0;
    id: string; //id del registro cargado
    areImagesLoaded: Boolean = false; //variable que controla si las imagenes están cargadas o no
    ACTION_UPDATE_IMAGE: string = "update";
    ACTION_ADD_IMAGE: string = "add";
    
    constructor(public imagesService:ImagesService, private route: ActivatedRoute, private router: Router, 
      public dialogRef: MatDialogRef<ImageGallery>, @Inject(MAT_DIALOG_DATA) public data: any,
      private sanitizer: DomSanitizer, public dialog: MatDialog) {
      
        this.id = this.data.id;
        console.log("Se cargarán imagenes del registro: " + this.id);

        this.imagesService.getImages(this.id).subscribe((result) => {
          console.log("--------------");
          console.log(result);
          console.log("--------------");
          this.addImageToArrayIfIsBase64(result[0].image1);
          this.addImageToArrayIfIsBase64(result[0].image2);
          this.addImageToArrayIfIsBase64(result[0].image3);
          this.addImageToArrayIfIsBase64(result[0].image4);

          console.log(this.imagesSizes);
        }, (err) => {
          console.log("Error--->" + err.message);
        });
    }

    private addImageToArrayIfIsBase64(base64Image: string) {
      if(base64Image == null){ //si la imagen es nula no se procesa
        return;
      }
      
      console.log("this.isBase64(base64Image)" + this.isBase64(base64Image));

      if(this.isBase64(base64Image)){
        var newImage = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64Image);
        this.images.push(newImage);

        this.loadImage(base64Image).then(image => {this.calculateSize(image)}).catch(err => console.error(err)); 
      }
    }

    private isBase64(input: any){
      if(input == null){
        return false;
      }
      
      var result = true;
      
      try {
        window.atob(input);
      } catch(e) {
        result = false;
      }
      return result;
    }

    private loadImage(base64Image: String) {
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.addEventListener('load', e => resolve(img));
        img.addEventListener('error', () => {
          reject(new Error(`Failed to load image`));
        });
        img.src = 'data:image/jpg;base64,' + base64Image;
      });
    }

    private calculateSize(img: any){
      var imageSize = {
        width: img.naturalWidth,
        height: img.naturalHeight
      }

      //Guardar las dimensiones en el arrego correspondiente
      this.imagesSizes.push(imageSize);

      this.areImagesLoaded = true;
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
              
              this.loadImage(result.image).then(image => {
                var img = image as HTMLImageElement;

                var imageSize = {
                  width: img.naturalWidth,
                  height: img.naturalHeight
                }
                
                this.imagesSizes[index] = imageSize;
              }).catch(err => console.error(err));

            }
            else{
              this.addImageToArrayIfIsBase64(result.image);
            }
          }
      });
    }

    imageIndex = 0;
    private log(image){
      console.log("Index imagen: " + this.imageIndex++);
    }
    
    ngOnInit() {}
}
