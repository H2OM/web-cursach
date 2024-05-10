'use client';
import { useState } from "react";
import './ratingbar.scss';
import { useRouter } from "next/navigation";

export default function Ratingbar ({rating, voices, mini = false, userrating = false, id, id2}) {
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState(false);
    const router = useRouter();
    const len = Math.ceil(rating);
    return (
        
        <div className={"Ratingbar " + (mini ? "Ratingbar_mini" : "")}>
            <div className="Ratingbar__rait">
                {
                    Array.from({length: 5}).map((_, i)=>{
                        
                        return (
                            <svg className={"Ratingbar__rait__star " + (selected >= (i+1) ? "Ratingbar__rait__star_full" : "")} width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg" key={i}
                            onMouseEnter={()=>{
                                if(!mini) setSelected(i+1);
                            }}
                            onMouseLeave={()=>{
                                setSelected(null);
                            }}
                            onClick={()=>{
                                if(!status && !mini) {
                                    setStatus(true);
                                    fetch('http://localhost/api/catalog/set-rating?mark='+(i+1)+'&id='+id, {method: 'GET', cache: "no-cache"})
                                        .then((data)=>{
                                            if(!data.ok) {
                                                throw new Error();
                                            }
                                            router.refresh();
                                        })
                                        .catch(()=>{
    
                                        })
                                        .finally(()=>setStatus(false));
                                }
                            }}
                            >
                                <path d="M5.88061 23.07L5.88056 23.0702C5.85306 23.2264 5.91485 23.3546 6.00976 23.4299C6.1027 23.5036 6.21513 23.5201 6.32514 23.4639L5.88061 23.07ZM5.88061 23.07L7.17748 15.6793L7.22376 15.4156L7.02987 15.2309L1.52553 9.98747C1.52549 9.98743 1.52544 9.98739 1.5254 9.98734C1.41972 9.88639 1.38802 9.74107 1.42943 9.60208C1.47062 9.46381 1.56872 9.37728 1.69212 9.35993L1.69285 9.35982L9.34597 8.27232L9.60439 8.2356L9.72199 8.00259L13.1344 1.24179C13.2573 0.998504 13.5674 0.998504 13.6903 1.24179L17.1027 8.00259L17.2203 8.2356L17.4787 8.27232L25.1318 9.35982L25.1326 9.35993C25.256 9.37728 25.354 9.4638 25.395 9.60179C25.4362 9.74044 25.4045 9.88573 25.2982 9.98695L25.2979 9.98719L19.7948 15.2309L19.6009 15.4156L19.6472 15.6793L20.9441 23.07L20.9441 23.0702C20.9716 23.2264 20.9099 23.3546 20.8149 23.4299C20.7219 23.5036 20.6094 23.5201 20.4993 23.4637C20.4993 23.4637 20.4992 23.4637 20.4991 23.4637L13.6385 19.9388L13.4099 19.8214L13.1814 19.9389L6.32555 23.4637L5.88061 23.07Z" fill={`url(#paint${id+id2+i}_linear_73_120)`} stroke="white"/>
                                <defs>
                                    <linearGradient id={`paint${id+id2+i}_linear_73_120`} x1="0.91211" y1="11.7199" x2="25.5049" y2="11.7199" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="white"/>
                                        <stop offset={`${((len == (i+1)) ? ((rating % 1) + 0.01) : (len > (i+1)) ? 1 : 0)}`} stopColor="white"/>
                                        <stop offset={`${((len == (i+1)) ? ((rating % 1) + 0.02) : (len > (i+1)) ? 1 : 0)}`} stopColor="white" stopOpacity="0"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        )
                    })
                }
            </div>
            <div className="Ratingbar__text">Рейтинг {rating.toFixed(2)} | {voices} {userrating ? <span className="Ratingbar__text__mark"> Ваша оценка {userrating}</span> : ''}</div>
        </div>
    )
}