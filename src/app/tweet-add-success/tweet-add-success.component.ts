import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tweet-add-success',
  templateUrl: './tweet-add-success.component.html',
  styleUrls: ['./tweet-add-success.component.css']
})
export class TweetAddSuccessComponent implements OnInit {
    id: String;
    constructor(private route: ActivatedRoute , private router: Router) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
    }

    goBack() {
        this.router.navigate(['/tweet-add/']);
    }
}
