import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './404-page-not-found.component.html',
    styleUrls: ['./404-page-not-found.component.css']
})

export class PageNotFoundComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {}

}
