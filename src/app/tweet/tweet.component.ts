import { Component, OnInit } from '@angular/core';
import { TweetService } from '../tweet.service';
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

  /*getTweets() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    });
}*/

  add() {
    this.router.navigate(['/tweet-add']);
  }

 /* delete(id) {
    this.rest.deleteProduct(id)
      .subscribe(res => {
          this.getProducts();
        }, (err) => {
          console.log(err);
        }
      );
  }*/

}
