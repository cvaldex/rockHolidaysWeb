import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetUpdateComponent } from './tweet-update.component';

describe('TweetUpdateComponent', () => {
  let component: TweetUpdateComponent;
  let fixture: ComponentFixture<TweetUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
