import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-search-by-date-holder',
    templateUrl: './tweet-search-by-date-holder.component.html',
    styleUrls: ['./tweet-search-by-date-holder.component.css']
})

export class TweetSearchByDateHolder implements OnInit {
    someError: Boolean = false;
    errorMessage = "";

    //cambiar
    @Input() searchData = { date:''};

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {}

    populateGridFunction(message) {
        console.log("Mensaje Holder: " + message);
    }
}
