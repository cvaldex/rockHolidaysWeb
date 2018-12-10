import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAddSuccessComponent } from './tweet-add-success.component';

describe('TweetAddSuccessComponent', () => {
  let component: TweetAddSuccessComponent;
  let fixture: ComponentFixture<TweetAddSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetAddSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetAddSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
