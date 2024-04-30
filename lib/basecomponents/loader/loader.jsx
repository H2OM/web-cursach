'use client';
import './loader.scss';

export default function Loader() {

    return (
        <div className="Loader">
            <div className="Loader__point" style={{animationDelay: '0s'}}></div>
            <div className="Loader__point" style={{animationDelay: '0.3s'}}></div>
            <div className="Loader__point" style={{animationDelay: '0.6s'}}></div>
        </div>
    )

}