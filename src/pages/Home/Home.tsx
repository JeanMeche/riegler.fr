import React, { FunctionComponent } from 'react';
import { DownArrow, UpArrow, LeftArrow, RightArrow } from '../../components/icons/Arrows';
import './Home.scss'

export const Home: FunctionComponent = () => {
    return (
        <div className="animated-title">
            <div className="text-top">
                <div>
                    <span>Ici</span>
                    <span>Matthieu Riegler</span>
                </div>
            </div>
            <div className="text-bottom">
                <div>Bienvenue !</div>
            </div>
        </div>
    );
}  