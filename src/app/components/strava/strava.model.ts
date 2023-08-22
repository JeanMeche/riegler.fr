import { formatDuration, intervalToDuration } from 'date-fns';

interface API_StravaData {
  run: API_StravaSportDetail;
  ride: API_StravaSportDetail;
}

interface API_StravaSportDetail {
  id: number;
  name: string;
  distance: number;
  start_date: string;
  moving_time: number;
  photoUrl: string;
  year_to_date_total_distance: number;
  totalTarget: number;
}

export function fetchStravaData(): Promise<StravaData> {
  const stravaDataUrl =
    'https://jeanmeche.azurewebsites.net/api/StravaLatestActivity';
  return fetch(stravaDataUrl)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('retry');
      }
      return resp;
    })
    .catch(() => fetch(stravaDataUrl))
    .then((resp) => resp.json())
    .then((json) => parseResponse(json));
}

function parseResponse(data: API_StravaData): StravaData {
  return {
    run: parseDetailResponse(data.run),
    ride: parseDetailResponse(data.ride),
  };
}

function parseDetailResponse(sportDetail: API_StravaSportDetail): StravaDetail {
  return {
    activityId: sportDetail.id,
    activityName: sportDetail.name,
    distance: (sportDetail.distance / 1000).toFixed(0),
    duration: humanDuration(sportDetail.moving_time),
    percentage:
      (sportDetail.year_to_date_total_distance / sportDetail.totalTarget) * 100,
    photoUrl: sportDetail.photoUrl,
    totalTarget: sportDetail.totalTarget,
  };
}

function humanDuration(time: number) {
  return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }), {
    format: ['hours', 'minutes'],
  });
}

export interface StravaData {
  run: StravaDetail;
  ride: StravaDetail;
}

export interface StravaDetail {
  activityId: number;
  distance: string; // in KM
  percentage: number;
  duration: string;
  activityName: string;
  photoUrl?: string;
  totalTarget: number;
}
