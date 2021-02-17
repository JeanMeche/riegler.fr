import React, { FunctionComponent, useEffect } from 'react';
import styles from './AnimatedStroke.module.css';

const AnimatedStroke: FunctionComponent<{ string: string }> = (props: { string: string }) => {
  useEffect(() => {
    document.title = "Joe l'Ane";
  }, []);

  const string = props.string ?? 'Joe l\'ane';

  return (
    <div className={styles.joe}>
      <svg viewBox="0 0 600 300">
        <symbol id="s-text">
          <text textAnchor="middle" x="50%" y="50%" dy=".35em">{string}</text>
        </symbol>
        <use className={styles.text} href="#s-text" />
        <use className={styles.text} href="#s-text" />
        <use className={styles.text} href="#s-text" />
        <use className={styles.text} href="#s-text" />
        <use className={styles.text} href="#s-text" />
      </svg>
    </div>
  );
};

export default AnimatedStroke;
