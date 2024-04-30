'use client';
import './uptitle.scss';
import { useInView } from "react-intersection-observer";


export default function Uptitle ({children, full = false}) {

    const [refUp, inViewUp] = useInView({triggerOnce: true});
    const [refDown, inViewDown] = useInView({triggerOnce: true});
    return (
        <div className="Uptitle__wrap">
            <div ref={refUp} className={"Uptitle__anchorUp" + (full ? "Uptitle__anchorUp_full " : "")}></div>
            <div className={"Uptitle " + (full ? "Uptitle_full " : "") + (((inViewUp && inViewDown) || (full && inViewDown)) ? "Uptitle_show" : "")}>
                {children}
            </div>
            <div ref={refDown} className={"Uptitle__anchorDown" + (full ? "Uptitle__anchorDown_full " : "")}></div>
        </div>
        
    )
}