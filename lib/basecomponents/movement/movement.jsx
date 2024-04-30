'use client';
import './movement.scss';
import { useState } from "react";

export default function Movement ({slides, blocks = false}) {
    const [current, setCurrent] = useState(0);
    
    return (
        <div className="Movement__wrap">
            <div className={blocks ? "Movement__blocks" : "Movement__slider"} 
                style={(blocks && current > 0) ? 
                    {transform: `translateX(calc(-${100*current}% - ${(((current+1) * 3) == slides.length) ? '160px' : '80px'}))`} 
                    : {transform: `translateX(-${100*current}%)`}}
                >
                {slides}
            </div>
            <nav className="Movement__nav" style={blocks ? {bottom: "-90px"} : {}}>
                {Array.from({length: (blocks ? slides.length / 3 : slides.length)}).map((_, i)=>{
                    return(
                        <div className={"Movement__nav__point " + ((i) == current ? "Movement__nav__point_select" : "")} 
                            key={i+"point"} onClick={()=>setCurrent(i)}>
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}