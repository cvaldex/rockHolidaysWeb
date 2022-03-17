import { Component, OnInit } from '@angular/core';
import { TweetService } from '../api-services/tweet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})

export class TweetComponent implements OnInit {

  tweets:any = [];

  constructor(public tweet:TweetService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.add();
    console.log("Add route added");
  }

  add() {
    this.router.navigate(['/tweet-add']);
  }

  publish() {
    this.router.navigate(['/tweet-publish']);
  }

  searchByDate() {
    this.router.navigate(['/tweet-search-by-date']);
  }

  searchByText() {
    this.router.navigate(['/tweet-search-by-text']);
  }
}
