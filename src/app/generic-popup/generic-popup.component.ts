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
    actionButtonMessage: String;
    cancelButtonMessage: String;
    showCancelButton: Boolean = false;

    constructor(private route: ActivatedRoute , private router: Router,
        public dialogRef: MatDialogRef<GenericPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.windowMessage = this.data.windowMessage;
        this.popupMessage = this.data.popupMessage;
        this.showCancelButton = this.data.showCancelButton;
        this.actionButtonMessage = this.data.actionButtonMessage;
        this.cancelButtonMessage = this.data.cancelButtonMessage;
    }

    closeDialog(word: string) {
        this.dialogRef.close(word);
    }  
    

}
