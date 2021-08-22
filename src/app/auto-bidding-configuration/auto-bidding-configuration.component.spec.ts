import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoBiddingConfigurationComponent } from './auto-bidding-configuration.component';

describe('AutoBiddingConfigurationComponent', () => {
  let component: AutoBiddingConfigurationComponent;
  let fixture: ComponentFixture<AutoBiddingConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoBiddingConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoBiddingConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
