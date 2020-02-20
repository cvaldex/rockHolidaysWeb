import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';

import { TweetAddComponent } from './tweet-add/tweet-add.component';
import { TweetAddSuccessComponent } from './tweet-add-success/tweet-add-success.component';

import { TweetPublishComponent } from './tweet-publish/tweet-publish.component';
import { TweetPublishSuccessComponent } from './tweet-publish-success/tweet-publish-success.component';

import { TweetSearchByDate } from './tweet-search-by-date/tweet-search-by-date.component';
import { TweetShowGrid } from './tweet-show-grid/tweet-show-grid.component';
import { TweetSearchByDateHolder } from './tweet-search-by-date-holder/tweet-search-by-date-holder.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule , FormBuilder } from '@angular/forms';

const appRoutes: Routes = [
  {
      path: 'tweet-add-success/:id',
      component: TweetAddSuccessComponent,
      data: { title: 'Tweet Added Succesfully' }
  },
  {
      path: 'tweet-add',
      component: TweetAddComponent,
      data: { title: 'Tweet Add' }
  },
  {
      path: 'tweet-publish',
      component: TweetPublishComponent,
      data: { title: 'Tweet Publish' }
  },
  {
      path: 'tweet-publish-success/:id',
      component: TweetPublishSuccessComponent,
      data: { title: 'Tweet Published Succesfully' }
  },
  {
      path: 'tweet-search-by-date',
      component: TweetSearchByDate,
      data: { title: 'Tweet Search By Date' }
  },
  {
      path: 'tweet-show-grid',
      component: TweetShowGrid,
      data: { title: 'Tweet Show Grid' }
  },
  {
      path: 'tweet-search-by-date-holder',
      component: TweetSearchByDateHolder,
      data: { title: 'Tweet Search By Date Holder' }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    TweetAddComponent,
    TweetAddSuccessComponent,
    TweetPublishComponent,
    TweetPublishSuccessComponent,
    TweetSearchByDate,
    TweetShowGrid,
    TweetSearchByDateHolder
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
