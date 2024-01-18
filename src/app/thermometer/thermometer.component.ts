import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TemperatureUnit} from "./thermometer.model";

@Component({
  selector: 'app-thermometer',
  standalone: true,
  imports: [],
  templateUrl: './thermometer.component.html',
  styleUrl: './thermometer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThermometerComponent implements OnChanges {
  @Input({required: true}) minTemperature: number = 0;
  @Input({required: true}) maxTemperature: number = 0;
  @Input({required: true}) currentTemperature: number = 0;
  @Input() temperatureUnit: TemperatureUnit = TemperatureUnit.Centigrade;
  minRotateDeg = -135;
  maxRotateDeg = 135;

  handRotateDeg = 0;

  ngOnChanges(): void {
    // if current temperature is greater than maximum
    if(this.currentTemperature >= this.maxTemperature){
      this.handRotateDeg = this.maxRotateDeg;
      // if current temperature is lower than minimum
    } else if(this.currentTemperature <= this.minTemperature) {
      this.handRotateDeg = this.minRotateDeg;
      // otherwise calculate the position of the hand on thermometer
    } else {
      this.handRotateDeg = this.calculateHandRotateDeg();
    }
  }

  calculateHandRotateDeg(){
    // sum of available degrees (angle) for rotation in circle
    const sumRotateDeg = Math.abs(this.minRotateDeg - this.maxRotateDeg);
    // sum of available temperature degrees
    const temperatureDegrees = Math.abs(this.maxTemperature - this.minTemperature);
    // number of degrees (angle) for hand rotation
    let result = (sumRotateDeg * (this.currentTemperature - this.minTemperature))/temperatureDegrees;
    // initial position of the thermometer hand is halfway between min and max, not at min, so we need to deduct min
    result = result - Math.abs(this.minRotateDeg);

    return result;
  }
}
