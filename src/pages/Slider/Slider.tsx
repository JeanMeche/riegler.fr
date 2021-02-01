import React, { useRef, useState } from 'react';
import { start } from 'repl';
import './Slider.scss';

interface SlideData {
    index: number,
    headline: string,
    button: string,
    src: string,
}

const slideData = [
    {
        index: 0,
        headline: 'New Fashion Apparel',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg'
    },
    {
        index: 1,
        headline: 'In The Wilderness',
        button: 'Book travel',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
    },
    {
        index: 2,
        headline: 'For Your Current Mood',
        button: 'Listen',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
    },
    {
        index: 3,
        headline: 'Focus On The Writing',
        button: 'Get Focused',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    },
    {
        index: 4,
        headline: 'Focus On The Writing',
        button: 'Get Focused',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    }
]

interface SlideProps {
    handleSlideClick: Function,
    slide: SlideData,
    current: number,
}

const Slide: React.FunctionComponent<SlideProps> = (props) => {
    const slide = useRef<HTMLLIElement>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const el = slide.current!;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--x', `${event.clientX - (r.left + Math.floor(r.width / 2))}`);
        el.style.setProperty('--y', `${event.clientY - (r.top + Math.floor(r.height / 2))}`);
    }

    const handleMouseLeave = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        slide.current!.style.setProperty('--x', '0')
        slide.current!.style.setProperty('--y', '0')
    }

    const handleSlideClick = () => {
        props.handleSlideClick(props.slide.index)
    }

    const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        (event.target as HTMLDivElement).style.opacity = "1"
    }


    const { src, button, headline, index } = props.slide;
    const current = props.current
    let classNames = 'slide'

    if (current === index) classNames += ' slide--current'
    else if (current - 1 === index) classNames += ' slide--previous'
    else if (current + 1 === index) classNames += ' slide--next'

    return (
        <li
            ref={slide}
            className={classNames}
            onClick={handleSlideClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="slide__image-wrapper">
                <img
                    className="slide__image"
                    alt={headline}
                    src={src}
                    onLoad={imageLoaded}
                />
            </div>

            <article className="slide__content">
                <h2 className="slide__headline noselect">{headline}</h2>
                <button className="slide__action btn">{button}</button>
            </article>
        </li>
    )
}

const SliderControlCmp = ({ type, title, handleClick }: { type: string, title: string, handleClick: any }) => {
    return (
        <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
            <svg className="icon" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
        </button>
    )
}

interface SliderProps {
    slides: SlideData[],
    heading: any,
}

const SliderCmp: React.FunctionComponent<SliderProps> = (props) => {
    const [current, setCurrent] = useState(0);
    const sliderWrapperRef = useRef<HTMLUListElement>(null);
    const startX = useRef<number>(0);
    const startOffsetX = useRef(0);

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent((previous < 0) ? props.slides.length - 1 : previous)
    }

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent((next === props.slides.length) ? 0 : next)
    }

    const handleSlideClick = (index: number) => {
        if (current !== index) {
            setCurrent(index);
        }
    }

    const handleTouchStart = (event: React.TouchEvent<HTMLUListElement>) => {
        const changedTouches = event.nativeEvent.changedTouches[0];
        startX.current = changedTouches.clientX;
        startOffsetX.current = new WebKitCSSMatrix(window.getComputedStyle(sliderWrapperRef.current!).transform).e;
    }

    const handleTouchMove = (event: React.TouchEvent<HTMLUListElement>) => {
        const changedTouches = event.nativeEvent.changedTouches[0];
        const deltaX = startX.current - changedTouches.clientX;
        sliderWrapperRef.current!.style.transform = `translateX(${startOffsetX.current - deltaX}px)`;
    }

    const handleTouchEnd = (event: React.TouchEvent<HTMLUListElement>) => {
        const currentOffset = new WebKitCSSMatrix(window.getComputedStyle(sliderWrapperRef.current!).transform).e;
        const sliderWidth = sliderWrapperRef.current!.getBoundingClientRect().width;
        const direction = startOffsetX.current - currentOffset;

        const currentSlideDecimal = (-currentOffset / sliderWidth * props.slides.length) % 1;
        let currentSlide: number;
        if (direction > 0) {
            currentSlide = currentSlideDecimal > 0.3 ? Math.ceil(-currentOffset / sliderWidth * props.slides.length) : current;
        } else {
            currentSlide = currentSlideDecimal < 0.7 ? Math.floor(-currentOffset / sliderWidth * props.slides.length) : current;
        }
        currentSlide = Math.min(Math.max(currentSlide, 0), props.slides.length - 1);  // waiting for Math.clamp 🤞
        if (currentSlide !== current) {
            setCurrent(Math.max(0, currentSlide));
        } else {
            const finalOffset = -sliderWrapperRef.current!.getBoundingClientRect().width * (currentSlide / props.slides.length);
            sliderWrapperRef.current!.style.transform = `translateX(${finalOffset}px)`;
        }
    }

    const headingId = `slider-heading__${props.heading.replace(/\s+/g, '-').toLowerCase()}`
    const offset = sliderWrapperRef.current ? (sliderWrapperRef.current.getBoundingClientRect().width * (current / props.slides.length)) : 0;
    const wrapperTransform = { 'transform': `translateX(-${offset}px)` }
    console.log(current, offset);
    return (
        <div className='slider' aria-labelledby={headingId} >
            <ul className="slider__wrapper" style={wrapperTransform} ref={sliderWrapperRef} onTouchMove={handleTouchMove} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <h3 id={headingId} className="visuallyhidden">{props.heading}</h3>

                {props.slides.map(slide => {
                    return (
                        <Slide
                            key={slide.index}
                            slide={slide}
                            current={current}
                            handleSlideClick={handleSlideClick}
                        />
                    )
                })}
            </ul>

            <div className="slider__controls">
                <SliderControlCmp
                    type="previous"
                    title="Go to previous slide"
                    handleClick={handlePreviousClick}
                />

                <SliderControlCmp
                    type="next"
                    title="Go to next slide"
                    handleClick={handleNextClick}
                />
            </div>
        </div>
    )
}

const Slider = () => {
    return <div className="slider-base"><SliderCmp heading="Example Slider" slides={slideData} /></div>
}

export default Slider;