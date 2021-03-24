import { formatDuration, intervalToDuration } from 'date-fns';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './strava.module.css';


const Strava: FunctionComponent = () => {
  const [data, setData] = useState<StravaData>();
  useEffect(() => {
    fetchStravaData().then((resp) => {
      setData(resp);
    })
  }, [])

  if (!data) {
    return <div>loading ...</div>
  }

  // <div className="lg:col-end-3 md:col-end-3 ">

  return (<div>
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
      {stravaCard(data.ride, 'Latest run on Strava')}
      {stravaCard(data.run, 'Latest ride on Strava')}
    </div>
  </div>)
};

function stravaCard(sportDetail: StravaSportDetail, label: string) {
  const percentage = sportDetail.year_to_date_total_distance / sportDetail.totalTarget * 100;

  return (
    <div className={styles.stravaCard}>
      <h4 className={styles.stravaCardTitle}>{label}</h4>
      <div className="strava-card-body">
        <a href={`https://www.strava.com/activities/${sportDetail.id}`} target="_blank" rel="noopener noreferrer">
          <div className={styles.latestRun + ' ' + styles.hasPhoto} style={{ 'backgroundImage': `linear-gradient(rgba(0, 0, 0, 0.25), transparent 25%, transparent 60%, rgba(0, 0, 0, 0.5)), url('${sportDetail.photoUrl}')` }}>
            <div className={styles.activityName}>
              {sportDetail.name}
            </div>
            <div className={styles.stats}>
              <div>
                <span className={styles.label}>Distance</span>
                <div>{(sportDetail.distance / 1000).toFixed(0)} km</div>
              </div>
              <div>
                <span className={styles.label}>Time</span>
                <div>{humanDuration(sportDetail.moving_time)}</div>
              </div>
            </div>
          </div>
        </a>
        <div className={styles.stravaStats}>
          <h4 className={styles.stravaCardTitle}>Year-to-date stats</h4>

          <p>Distance: {(sportDetail.year_to_date_total_distance / 1000).toFixed()} km</p>
          <p>Goal: {sportDetail.totalTarget / 1000} km</p>
          <p>Progress</p>
          { }
          <div className={styles.goalProgress} style={{ width: `${percentage}%` }} title={`${percentage}%`}></div>
        </div>
      </div>
    </div>
  )
}


function humanDuration(time: number) {
  return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }), { format: ['hours', 'minutes'] })
}

function fetchStravaData(): Promise<StravaData> {
  const stravaDataUrl = 'https://jeanmeche.azurewebsites.net/api/StravaLatestActivity?';
  return fetch(stravaDataUrl)
    .catch(() => fetch(stravaDataUrl))
    .then((resp) => resp.json())
}

interface StravaData {
  run: StravaSportDetail
  ride: StravaSportDetail
}

interface StravaSportDetail {
  id: number
  name: string
  distance: number
  start_date: string
  moving_time: number
  photoUrl: string,
  year_to_date_total_distance: number,
  totalTarget: number
}

export default Strava;


