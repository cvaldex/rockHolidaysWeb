import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetShowGrid } from './tweet-show-grid.component';

describe('TweetShowGrid', () => {
  let component: TweetShowGrid;
  let fixture: ComponentFixture<TweetShowGrid>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetShowGrid ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetShowGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
