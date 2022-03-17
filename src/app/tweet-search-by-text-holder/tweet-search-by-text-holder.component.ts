import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-search-by-text-holder',
    templateUrl: './tweet-search-by-text-holder.component.html',
    styleUrls: ['./tweet-search-by-text-holder.component.css']
})

export class TweetSearchByTextHolder implements OnInit {
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
