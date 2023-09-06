import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateproposalComponent } from './generateproposal.component';

describe('GenerateproposalComponent', () => {
  let component: GenerateproposalComponent;
  let fixture: ComponentFixture<GenerateproposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateproposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateproposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
