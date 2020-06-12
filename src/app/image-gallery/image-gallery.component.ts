import { Component, OnInit, Input } from '@angular/core';
import { ImagesService } from '../images.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Observable } from 'rxjs';
//import { MessageService } from '../services/index';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

//import { TweetUpdateComponent } from '../tweet-update/tweet-update.component';
//import { GenericPopupComponent } from '../generic-popup/generic-popup.component';

@Component({
    selector: 'app-image-gallery',
    templateUrl: './image-gallery.component.html',
    styleUrls: ['./image-gallery.component.css']
})

export class ImageGallery implements OnInit {
    //someError: Boolean = false;
    //errorMessage = "";
    //subscription: Subscription;
    //tweets: [];
    //tweetsLength = 0;

    //@Input() searchData = { date:''};
    images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
    
    constructor(public imagesService:ImagesService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {

    }

    ngOnInit() {


    }
    
}
