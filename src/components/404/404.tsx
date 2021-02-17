import { FunctionComponent } from 'react';
import ReactTyped from 'react-typed';
import styles from './404.module.css';

const strings = [`Oops! It looks like you're lost. <br> ^1000
    Sorry about that. <br> ^1000 
    Let me try and help. <br> ^1000
    Go back <a class='${styles.link}' href='/'>home</a> and start over.`]

const p404: FunctionComponent = () => {
    return (
        <div className={styles.body}>
            <div className={styles.content}>
                <div className={styles.browserBar}>
                    <span className={`${styles.close} ${styles.button}`}></span>
                    <span className={`${styles.min} ${styles.button}`}></span>
                    <span className={`${styles.max} ${styles.button}`}></span>
                </div>
                <div className={styles.text}>
                    <ReactTyped
                        strings={strings}
                        typeSpeed={40}
                    />
                </div>
            </div>
        </div>
    )
}

export default p404;