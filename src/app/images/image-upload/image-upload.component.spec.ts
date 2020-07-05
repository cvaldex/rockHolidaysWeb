import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUpload } from './image-upload.component';

describe('TweetShowGrid', () => {
  let component: ImageUpload;
  let fixture: ComponentFixture<ImageUpload>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUpload ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
