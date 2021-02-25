import { addSeconds, format, formatDistance, formatDuration, intervalToDuration } from 'date-fns';
import loadConfig from 'next/dist/next-server/server/config';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './strava.module.css';


const Strava: FunctionComponent = () => {
  const [data, setData] = useState<StravaData>();
  useEffect(() => {
    fetchStravaData().then((resp) => {
      setData(resp);
    })
  }, [])

  const totalTarget = 6000;
  const percentage = (data?.year_to_date_ride_total_distance ?? 0) / totalTarget / 1000 * 100;

  return (<div>
    { !data
      ? <div>loading...</div>
      : <div className={styles.stravaCard}>
        <h4 className={styles.stravaCardTitle}>Latest ride on Strava</h4>
        <div className="strava-card-body">
          <a href={`https://www.strava.com/activities/${data.id}`} target="_blank" rel="noopener noreferrer">
            <div className={styles.latestRun + ' ' + styles.hasPhoto} style={{ 'backgroundImage': `linear-gradient(rgba(0, 0, 0, 0.25), transparent 25%, transparent 60%, rgba(0, 0, 0, 0.5)), url('${data.photoUrl}')` }}>
              <div className={styles.activityName}>
                {data.name}
              </div>
              <div className={styles.stats}>
                <div>
                  <span className={styles.label}>Distance</span>
                  <div>{(data.distance / 1000).toFixed(0)} km</div>
                </div>
                <div>
                  <span className={styles.label}>Time</span>
                  <div>{humanDuration(data.moving_time)}</div>
                </div>
              </div>
            </div>
          </a>
          <div className={styles.stravaStats}>
            <h4 className={styles.stravaCardTitle}>Year-to-date stats</h4>

            <p>Distance: {(data.year_to_date_ride_total_distance / 1000).toFixed()} km</p>
            <p>Goal: {totalTarget} km</p>
            <p>Progress</p>
            {}
            <div className={styles.goalProgress} style={{ width: `${percentage}%` }} title={`${percentage}%`}></div>
          </div>
        </div>
      </div>
    }</div>)
};

function humanDuration(time: number) {
  return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }), { format: ['hours', 'minutes'] })
}

function fetchStravaData(): Promise<StravaData> {
  const stravaDataUrl = 'https://jeanmeche.azurewebsites.net/api/StravaLatestActivity?';
  return fetch(stravaDataUrl).then((resp) => resp.json())
}

interface StravaData {
  id: number
  name: string
  distance: number
  start_date: string
  moving_time: number
  year_to_date_ride_total_distance: number,
  photoUrl: string
}

export default Strava;


