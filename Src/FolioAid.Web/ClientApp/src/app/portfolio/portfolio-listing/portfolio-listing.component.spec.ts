import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioListingComponent } from './portfolio-listing.component';

describe('PortfolioListingComponent', () => {
  let component: PortfolioListingComponent;
  let fixture: ComponentFixture<PortfolioListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
