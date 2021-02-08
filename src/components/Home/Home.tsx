import React, { FunctionComponent } from 'react';
import styles from './Home.module.scss';

const Home: FunctionComponent = () => (
  <div className={styles.animatedTitle}>
    <div className={styles.textTop}>
      <div>
        <span>Ici</span>
        <span>Matthieu Riegler</span>
      </div>
    </div>
    <div className={styles.textBottom}>
      <div>Bienvenue !</div>
    </div>
  </div>
);

export default Home;
