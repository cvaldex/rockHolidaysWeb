import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';
import { TweetAddComponent } from './tweet-add/tweet-add.component';
import { TweetAddSuccessComponent } from './tweet-add-success/tweet-add-success.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
/*
  {
    path: 'products',
    component: ProductComponent,
    data: { title: 'Product List' }
  },*/
  {
      path: 'tweet-add-success/:id',
      component: TweetAddSuccessComponent,
      data: { title: 'Tweet Added Succesfully' }
  },
  {
      path: 'tweet-add',
      component: TweetAddComponent,
      data: { title: 'Tweet Add' }
  }
   /*,
  {
    path: 'product-edit/:id',
    component: ProductEditComponent,
    data: { title: 'Product Edit' }
  },
  { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
}*/
];

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    TweetAddComponent,
    TweetAddSuccessComponent
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
