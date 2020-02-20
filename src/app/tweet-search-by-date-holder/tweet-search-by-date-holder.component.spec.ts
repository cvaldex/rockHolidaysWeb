import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetShowGrid } from './tweet-search-by-date-holder.component';

describe('TweetSearchByDateHolder', () => {
  let component: TweetSearchByDateHolder;
  let fixture: ComponentFixture<TweetSearchByDateHolder>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetSearchByDateHolder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetSearchByDateHolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
