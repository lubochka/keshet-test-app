import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterBarComponent } from './counter-bar.component';

describe('CounterBarComponent', () => {
  let component: CounterBarComponent;
  let fixture: ComponentFixture<CounterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
