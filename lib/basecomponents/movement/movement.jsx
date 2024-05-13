'use client';
import './movement.scss';
import { useState } from "react";

export default function Movement ({children, blocks = false}) {
    const [current, setCurrent] = useState(0);
    
    return (
        <div className="Movement__wrap">
            <div role='wrap' className={blocks ? "Movement__blocks" : "Movement__slider"} 
                style={(blocks && current > 0) ? 
                    {transform: `translateX(calc(-${100*current}% - ${(((current+1) * 3) == children.length) ? '160px' : '80px'}))`} 
                    : {transform: `translateX(-${100*current}%)`}}
                >
                {children}
            </div>
            <nav className="Movement__nav" style={blocks ? {bottom: "-90px"} : {}}>
                {Array.from({length: (blocks ? children.length / 3 : children.length)}).map((_, i)=>{
                    return(
                        <div role='navRadio' className={"Movement__nav__point " + ((i) == current ? "Movement__nav__point_select" : "")} 
                            key={i+"point"} onClick={()=>setCurrent(i)}>
                        </div>
                    )
                })}
            </nav>
        </div>
    )
}