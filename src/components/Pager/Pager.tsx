import React, { FunctionComponent, useRef } from 'react';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styles from './pager.module.scss';
import ClientOnly from '../ClientOnly';

const pages = [
  'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

const clamp = function (val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
};

const Pager = () => {
  const index = useRef(0);
  const [props, set] = useSprings(pages.length, (i) => ({ x: i * window.innerWidth, sc: 1, display: 'block' as const }));
  const bind = useDrag(({
    down, movement: [xMovement], direction: [xDir], distance, cancel,
  }) => {
    if (down && distance > window.innerWidth / 2) {
      cancel?.();
      index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1);
    }

    set((i) => {
      if (i < index.current - 1 || i > index.current + 1) {
        return { display: 'none' as 'block' };
      }
      const x = (i - index.current) * window.innerWidth + (down ? xMovement : 0);
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
      return { x, sc, display: 'block' };
    });
  });
  return (
    <div className={styles.pager}>
      {props.map(({ x, display, sc }, i) => (
        <animated.div {...bind()} key={i} style={{ display, transform: x.to((x) => `translate3d(${x}px,0,0)`) }}>
          <animated.div style={{ transform: sc.to((s) => `scale(${s})`), backgroundImage: `url(${pages[i]})` as 'initial' }} />
        </animated.div>
      ))}
    </div>
  );
};

const Pager2: FunctionComponent = () => <ClientOnly><Pager /></ClientOnly>;

export default Pager2;
