import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermometerComponent } from './thermometer.component';

describe('ThermometerComponent', () => {
  let component: ThermometerComponent;
  let fixture: ComponentFixture<ThermometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThermometerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThermometerComponent);
    component = fixture.componentInstance;
  });
  describe('handRotateDeg', () => {
    it('should be min', () => {
      component.minTemperature = -100;
      component.maxTemperature = 100;
      component.currentTemperature = -200;
      component.ngOnChanges();

      expect(component.handRotateDeg).toEqual(component.minRotateDeg);
    });

    it('should be max', () => {
      component.minTemperature = -100;
      component.maxTemperature = 100;
      component.currentTemperature = 200;
      component.ngOnChanges();

      expect(component.handRotateDeg).toEqual(component.maxRotateDeg);
    });

    it('should be zero', () => {
      component.minTemperature = -100;
      component.maxTemperature = 100;
      component.currentTemperature = 0;
      component.ngOnChanges();

      expect(component.handRotateDeg).toEqual(0);
    });

    it('should be max/2', () => {
      component.minTemperature = -100;
      component.maxTemperature = 100;
      component.currentTemperature = 50;
      component.ngOnChanges();

      expect(component.handRotateDeg).toEqual(component.maxRotateDeg/2);
    });

    it('should be min/4', () => {
      component.minTemperature = -100;
      component.maxTemperature = 100;
      component.currentTemperature = -25;
      component.ngOnChanges();

      expect(component.handRotateDeg).toEqual(component.minRotateDeg/4);
    });

    it('should be max/2 when max is below zero', () => {
      component.minTemperature = -300;
      component.maxTemperature = -200;
      component.currentTemperature = -225;
      component.ngOnChanges();

      expect(component.handRotateDeg).toEqual(component.maxRotateDeg/2);
    });

    it('should be max/9 when min is greater than zero', () => {
      component.minTemperature = 10;
      component.maxTemperature = 100;
      component.currentTemperature = 60;
      component.ngOnChanges();

      expect(component.handRotateDeg).toEqual(component.maxRotateDeg/9);
    });
  })
});
