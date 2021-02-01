import { useEffect } from 'react';
import styles from './Joe.module.scss';
import React from 'react';

const Joe = () => {
    useEffect(() => {
        document.title = "Joe l'Ane"
     }, []);

    return (
        <div className={styles.joe}>
            <svg viewBox="0 0 600 300">
                <symbol id="s-text">
                    <text textAnchor="middle" x="50%" y="50%" dy=".35em">Joe l'Ane</text>
                </symbol>
                <use className={styles.text} href="#s-text" />
                <use className={styles.text} href="#s-text" />
                <use className={styles.text} href="#s-text" />
                <use className={styles.text} href="#s-text" />
                <use className={styles.text} href="#s-text" />
            </svg >
        </div >
    )
}

export default Joe;