import React, { FunctionComponent } from 'react';
import styles from './Neon.module.scss';

export const Neon: FunctionComponent = () => {
    return (
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
        </div >
    );
}  