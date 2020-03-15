import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAddComponent } from './tweet-search-by-text.component';

describe('TweetSearchByText', () => {
  let component: TweetSearchByText;
  let fixture: ComponentFixture<TweetSearchByText>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetSearchByText ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetSearchByText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
