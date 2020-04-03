import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-generic-popup',
  templateUrl: './generic-popup.component.html',
  styleUrls: ['./generic-popup.component.css']
})
export class GenericPopupComponent implements OnInit {
    windowMessage: String;
    popupMessage: String;
    constructor(private route: ActivatedRoute , private router: Router,
        public dialogRef: MatDialogRef<GenericPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        //this.id = this.route.snapshot.params['id'];
        this.windowMessage = this.data.windowMessage;
        this.popupMessage = this.data.popupMessage;
    }

    close() {
        this.dialogRef.close();
    }   
}
