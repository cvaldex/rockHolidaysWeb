import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';

import { TweetAddComponent } from './tweet-add/tweet-add.component';
import { TweetPublishComponent } from './tweet-publish/tweet-publish.component';
import { TweetUpdateComponent } from './tweet-update/tweet-update.component';
import { TweetSearchByDate } from './tweet-search-by-date/tweet-search-by-date.component';
import { TweetShowGrid } from './tweet-show-grid/tweet-show-grid.component';
import { TweetSearchByDateHolder } from './tweet-search-by-date-holder/tweet-search-by-date-holder.component';
import { TweetSearchByText } from './tweet-search-by-text/tweet-search-by-text.component';
import { TweetSearchByTextHolder } from './tweet-search-by-text-holder/tweet-search-by-text-holder.component';

import {GenericPopupComponent} from './generic-popup/generic-popup.component';

import{ImageGallery} from './images/image-gallery/image-gallery.component';
import{ImageUpload} from './images/image-upload/image-upload.component';

import{PageNotFoundComponent} from './404-page-not-found/404-page-not-found.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule , FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from '@angular/material/dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const appRoutes: Routes = [
  {
      path: 'addTweet',
      component: TweetAddComponent,
      data: { title: 'Tweet Add' }
  },
  {
      path: 'publishTweet',
      component: TweetPublishComponent,
      data: { title: 'Tweet Publish' }
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
      path: 'searchByDate',
      component: TweetSearchByDateHolder,
      data: { title: 'Tweet Search By Date Holder' }
  },
  {
      path: 'searchByText',
      component: TweetSearchByTextHolder,
      data: { title: 'Tweet Search By Text Holder' }
  },
  {
    path: 'updateTweet',
    component: TweetUpdateComponent,
    data: { title: 'Tweet Update Holder' }
  },
  {
    path: 'imageGallery',
    component: ImageGallery,
    data: { title: 'Image Gallery' }
  },
  {
    path: 'imageUpload',
    component: ImageUpload,
    data: { title: 'Image Upload' }
  },
  {
    path: '**', pathMatch: 'full',
    component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    TweetAddComponent,
    TweetPublishComponent,
    TweetSearchByDate,
    TweetShowGrid,
    TweetSearchByDateHolder,
    TweetSearchByText,
    TweetSearchByTextHolder,
    TweetUpdateComponent,
    GenericPopupComponent,
    ImageGallery,
    ImageUpload,
    PageNotFoundComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDialogModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    GenericPopupComponent
]
})
export class AppModule { }
