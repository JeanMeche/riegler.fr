import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StravaDetail } from './strava.model';

@Component({
  selector: 'app-strava-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <h4 class="text-orange-500 font-bold mb-2 mt-0">{{ label }}</h4>
    <div class="strava-card-body">
      <a
        href="https://www.strava.com/activities/{{ sportDetail.activityId }}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          class="latestRun hasPhoto rounded-lg"
          style.backgroundImage="linear-gradient(rgba(0, 0, 0, 0.25), transparent 25%, transparent 60%, rgba(0, 0, 0, 0.5)), url('{{
            sportDetail.photoUrl
          }}'"
        >
          <div class="text-white">
            {{ sportDetail.activityName }}
          </div>
          <div
            *ngIf="!sportDetail.photoUrl"
            div
            class="flex justify-center text-slate-400"
          >
            No photo 🙁
          </div>
          <div class="flex justify-between text-white">
            <div>
              <span>Distance</span>
              <div>{{ sportDetail.distance }} km</div>
            </div>
            <div class="text-end">
              <span>Time</span>
              <div>{{ sportDetail.duration }}</div>
            </div>
          </div>
        </div>
      </a>
      <div class="mt-4 relative">
        <h4 class="text-orange-500 mb-2">Year-to-date stats</h4>

        <p class="">
          Distance: {{ sportDetail.distance }}
          km
        </p>
        <p class="">Goal: {{ sportDetail.totalTarget / 1000 }} km</p>
        <p class="mb-3">Progress</p>

        <div class="bg-gray-200 dark:bg-gray-600 rounded-lg">
          <div
            class="bg-orange-500 h-2 rounded-lg"
            style.width="{{ sportDetail.percentage }}%"
            title="{{ sportDetail.percentage }}%"
          ></div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./strava.card.scss'],
})
export class StravaCard {
  @Input({ required: true }) sportDetail!: StravaDetail;
  @Input({ required: true }) label!: string;
}
