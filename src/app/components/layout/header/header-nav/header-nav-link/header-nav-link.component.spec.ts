import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNavLinkComponent } from './header-nav-link.component';

describe('HeaderNavLinkComponent', () => {
  let component: HeaderNavLinkComponent;
  let fixture: ComponentFixture<HeaderNavLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HeaderNavLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
