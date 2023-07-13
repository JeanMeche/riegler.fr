import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedBlogPreviewComponent } from './featured-blog-preview.component';

describe('FeaturedBlogPreviewComponent', () => {
  let component: FeaturedBlogPreviewComponent;
  let fixture: ComponentFixture<FeaturedBlogPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FeaturedBlogPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedBlogPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
