import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGallery } from './image-gallery.component';

describe('TweetShowGrid', () => {
  let component: ImageGallery;
  let fixture: ComponentFixture<ImageGallery>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageGallery ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
