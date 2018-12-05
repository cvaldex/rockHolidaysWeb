import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet/tweet.component';
import { TweetAddComponent } from './tweet-add/tweet-add.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
/*
  {
    path: 'products',
    component: ProductComponent,
    data: { title: 'Product List' }
  },
  {
    path: 'product-details/:id',
    component: ProductDetailComponent,
    data: { title: 'Product Details' }
},*/
  {
    path: 'tweet-add',
    component: TweetAddComponent,
    data: { title: 'Tweet Add' }
} /*,
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
    TweetAddComponent
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
