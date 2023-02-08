import { FunctionComponent } from 'react';
import styles from './Cycling.module.css';

const Cycling: FunctionComponent = () => {
  return (
    <div className={styles.cyclingWrapper}>
      <div className={styles.bikeRiding}>
        <div className={styles.clouds}></div>
        <div className={styles.shadowWrapper}>
          <div className={styles.shadow}></div>
        </div>
        <div className={styles.cyclist}>
          <div className={styles.bike}>
            <div className={styles.leftTyre}>
              <div className={styles.spokes}></div>
            </div>
            <div className={styles.rightTyre}>
              <div className={styles.spokes}></div>
            </div>
            <div className={styles.wheel}></div>
            <div className={styles.pedals}></div>
            <div className={styles.chain}></div>
          </div>
          <div className={styles.girl}>
            <div className={styles.top}></div>
            <div className={styles.rightArm}></div>
            <div className={styles.leftArm}></div>
            <div className={styles.head}></div>
            <div className={styles.hair}></div>
            <div className={styles.strap}></div>
            <div className={styles.trousers}>
              <div className={styles.leftLeg}>
                <div className={styles.leftcalf}></div>
              </div>
              <div className={styles.rightLeg}>
                <div className={styles.calf}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cycling;
