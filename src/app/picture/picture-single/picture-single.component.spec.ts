import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureSingleComponent } from './picture-single.component';

describe('PictureSingleComponent', () => {
  let component: PictureSingleComponent;
  let fixture: ComponentFixture<PictureSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
