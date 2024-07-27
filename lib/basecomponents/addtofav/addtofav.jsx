'use client';
import { useContext, useState } from 'react';
import './addtofav.scss';
import ClientContext from '@/lib/context/ClientContext';

export default function Addtofav ({id, title, article, image, mini = false, staronly = false}) {
    const {favorites, setFavorites} = useContext(ClientContext);
    const [isLoad, setLoad] = useState(false);

    const clickStarHandler = ()=>{
        if(!isLoad) {
            setLoad(true);
            fetch('/api/user/' +(favorites[id] ? "rem-fav" :"add-fav")+'?id='+id, {method: 'GET', cache: "no-cache"})
            .then(data=>{
                if(!data.ok) {
                    throw new Error();
                }

                let temp = {...favorites};

                favorites[id] ? delete temp[id] : temp[id] = [title, article, image];
                
                setFavorites(()=>temp);

            }).catch(()=>false)
            .finally(()=>setLoad(false));
        }
    }

    return (
        <div className={'Fav ' + (mini ? "Fav__mini " : "")} style={staronly ? {marginLeft: "10px", marginTop: "6px", marginRight: "0px"} : {}} onClick={clickStarHandler}>
            {!staronly ? (favorites[id] ? "В избранном" : "Добавить в избранное") : null}
            <svg role='star' className="Fav__star" width="50" height="51" style={staronly ? {height: "20px", width: "20px"} : {}} viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2_7)">
                <path d="M11.2874 49.2117C10.0812 49.8305 8.71244 48.7461 8.95619 47.3617L11.5499 32.5805L0.540567 22.093C-0.487558 21.1117 0.0468174 19.318 1.42494 19.1242L16.7312 16.9492L23.5562 3.42737C24.1718 2.20862 25.8374 2.20862 26.4531 3.42737L33.2781 16.9492L48.5843 19.1242C49.9624 19.318 50.4968 21.1117 49.4656 22.093L38.4593 32.5805L41.0531 47.3617C41.2968 48.7461 39.9281 49.8305 38.7218 49.2117L24.9999 42.1617L11.2874 49.2117Z" 
                style={favorites[id] ? {fill: 'white'} : {stroke: 'white'}}/>
                </g>
                <defs>
                <clipPath id="clip0_2_7">
                <rect width="50" height="50" fill="white" transform="translate(0 0.952362)"/>
                </clipPath>
                </defs>
            </svg>
        </div>
    )
}