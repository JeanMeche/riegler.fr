
import { Component } from '@angular/core';
import { CyclingComponent } from './cycling.component';
import { StravaCard } from './strava.card';
import { StravaData, fetchStravaData } from './strava.model';

@Component({
  selector: 'app-strava',
  standalone: true,
  template: `
    @if (!this.stravaData) {
      <app-cycling />
    }
    <div
      class="w-full grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32"
      >
      @if (this.stravaData) {
        <app-strava-card
          [sportDetail]="this.stravaData.ride"
          label="Latest ride on Strava"
          />
        <app-strava-card
          [sportDetail]="this.stravaData.run"
          label="Latest run on Strava"
          />
      }
    </div>
    `,
  imports: [StravaCard, CyclingComponent],
  styles: [``],
})
export class StravaComponent {
  stravaData: StravaData | undefined;
  constructor() {
    fetchStravaData().then((data) => (this.stravaData = data));
  }
}
