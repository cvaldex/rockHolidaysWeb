import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetPublishSuccessComponent } from './tweet-publish-success.component';

describe('TweetAddSuccessComponent', () => {
  let component: TweetPublishSuccessComponent;
  let fixture: ComponentFixture<TweetPublishSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetPublishSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetPublishSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
