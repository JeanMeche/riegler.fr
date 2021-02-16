import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import styles from './Home.module.scss';
import cn from 'classnames'

const Home: FunctionComponent = () => (
  <div>
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
    <div className={cn('static', styles.button)}>
      <a className="absolute bottom-10 right-10 cursor-pointer">
        <Link href="posts">
          <svg className="w-24 h-24 ml-2 transition delay-2000 transform hover:-translate-y-1 hover:scale-110" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </a>
    </div>
  </div>
);

export default Home;
