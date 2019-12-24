import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAddComponent } from './tweet-add.component';

describe('TweetAddComponent', () => {
  let component: TweetAddComponent;
  let fixture: ComponentFixture<TweetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
