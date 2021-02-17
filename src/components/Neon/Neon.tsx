import React, { FunctionComponent } from 'react';
import styles from './Neon.module.css';

const Neon: FunctionComponent = () => (
  <div className={styles.tiles}>
    <div className={styles.sign}>
      <div>
        <span className={styles['fast-flicker']}>Com</span>
        <span>passion</span>
      </div>
      <span>&amp;</span>
      <div>
        <span className={styles.flicker}>e</span>
        <span>motion</span>
      </div>
    </div>
  </div>
);

export default Neon;
