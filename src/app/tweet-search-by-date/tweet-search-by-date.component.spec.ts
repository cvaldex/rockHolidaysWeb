import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAddComponent } from './tweet-search-by-date.component';

describe('TweetSearchByDate', () => {
  let component: TweetSearchByDate;
  let fixture: ComponentFixture<TweetSearchByDate>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetSearchByDate ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetSearchByDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
