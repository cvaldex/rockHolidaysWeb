import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GenericPopupComponent } from '../generic-popup/generic-popup.component';
import { ImageGallery } from '../image-gallery/image-gallery.component';


@Component({
  selector: 'app-tweet-add-success',
  templateUrl: './tweet-add-success.component.html',
  styleUrls: ['./tweet-add-success.component.css']
})

export class TweetAddSuccessComponent implements OnInit {
    id: String;
    constructor(private route: ActivatedRoute , private router: Router , public dialog: MatDialog) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
    }

    showPopup() {
        var selectedButton = "";
        var popupData = {
            windowMessage : "Window Message",
            popupMessage : "Popup Message",
            actionButtonMessage: "Aceptar!!",
            cancelButtonMessage: "Cancelar!!",
            showCancelButton: true
        };

        let dialogRef = this.dialog.open(GenericPopupComponent, {data: popupData});

        dialogRef.afterClosed().subscribe(result => {
            console.log("Pressed button: " + result);
        });
    }

    showGallery() {
        //var selectedButton = "";
        var imageGalleryData = {
            id : "3242"
        };

        let dialogRef = this.dialog.open(ImageGallery, {data: imageGalleryData});

        dialogRef.afterClosed().subscribe(result => {
            console.log("Closed Image Gallery");
        });
    }

    
}
