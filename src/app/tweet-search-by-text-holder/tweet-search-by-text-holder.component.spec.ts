import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetShowGrid } from './tweet-search-by-date-holder.component';

describe('TweetSearchByTextHolder', () => {
  let component: TweetSearchByTextHolder;
  let fixture: ComponentFixture<TweetSearchByTextHolder>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetSearchByTextHolder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetSearchByTextHolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
