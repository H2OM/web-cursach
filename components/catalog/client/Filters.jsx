'use client';
import { useEffect, useState } from 'react';
import './filters.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Sort from './Sort';

export default function Filters({ cities }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    
    const [filterMenu, setFilterMenu] = useState(false);
    const [rating, setRating] = useState({ 
        min: (params.get('rating') && params.get('rating').split(',')[0]) || "", 
        max: (params.get('rating') && params.get('rating').split(',')[1]) || ""
    });
    const [selectedFilters, setSelectedFilters] = useState([]);

    useEffect(()=>{
        let temp = [];
        if(params.size > 0) {
            params.entries().forEach(each=>{
                if(each[0] != "rating") {
                    temp.push(each[1].split(',').map((key,i)=>{
                        if(key == "") return;
                        let type = "";
                        if(each[0] == "cities") type = "Город";
                            else if(each[0] == "favs") type = "Избранное";
                            else return;
    
                        return (
                            <div className="Filters__filter__selected__block" key={i+key}>
                                {type}: {key == "true" ? "Только избранное" : key == "false" ? "Все кроме избранного" : key}
    
                                <button className="Filters__filter__selected__block__close" onClick={()=>{
                                    if(each[0]=="cities") {
                                        params.set('cities', params.get('cities').replace(key+',',''));
                                        if(params.get('cities').length == 0) params.delete('cities');
    
                                    } else {
                                        params.delete(each[0]);
                                    }
                                    router.push(pathname + `?` + params.toString(), {scroll: false});
                                }}></button>
                            </div>
                        )
                    }));
                }
                else if(each[0] == "rating") {
                    temp.push([each[1]].map((key)=>{
    
                        let vals = key.split(',');
                        return (
                            <div className="Filters__filter__selected__block" key={each[0]+key}>
                                Рейтинг: {vals[0] != "" ? `от ${vals[0]}` : ""} {vals[1] != "" ? `до ${vals[1]}` : ""}
    
                                <button className="Filters__filter__selected__block__close" onClick={()=>{
                                    params.delete('rating');
                                    router.push(pathname + `?` + params.toString(), {scroll: false});
                                }}></button>
                            </div>
                        )
                    }));
                } else return;
            });
        }
        setSelectedFilters(temp);
    }, [searchParams]);
    
    return (
        <div className="Filters">
            <Sort/>
            <div className="Filters__filter">
                <div className="Filters__filter__selected">
                    {selectedFilters}
                </div>
                <button className="Filters__filter__main" onClick={() => setFilterMenu(prev => !prev)}>
                    Фильтры
                    <svg className="Filters__filter__main__svg" width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.15625 1.30786C0.15625 1.11724 0.231975 0.93442 0.366767 0.799628C0.501559 0.664837 0.684376 0.589111 0.875 0.589111H18.125C18.3156 0.589111 18.4984 0.664837 18.6332 0.799628C18.768 0.93442 18.8438 1.11724 18.8438 1.30786V4.18286C18.8437 4.36012 18.7782 4.53111 18.6597 4.66299L12.375 11.6464V18.5579C12.3749 18.7087 12.3273 18.8556 12.2391 18.9779C12.1509 19.1001 12.0264 19.1916 11.8834 19.2392L7.57088 20.6767C7.46288 20.7127 7.34789 20.7225 7.23536 20.7053C7.12284 20.6882 7.016 20.6445 6.92364 20.578C6.83128 20.5115 6.75605 20.424 6.70413 20.3227C6.65221 20.2214 6.62509 20.1092 6.625 19.9954V11.6464L0.34025 4.66299C0.221812 4.53111 0.156282 4.36012 0.15625 4.18286V1.30786ZM1.59375 2.02661V3.90686L7.8785 10.8902C7.99694 11.0221 8.06247 11.1931 8.0625 11.3704V18.9977L10.9375 18.0404V11.3704C10.9375 11.1931 11.0031 11.0221 11.1215 10.8902L17.4062 3.90686V2.02661H1.59375Z" fill="white" />
                    </svg>
                </button>
            </div>
            <div className={"Filters__filtermenu " + (filterMenu ? "Filters__filtermenu_show" : "")}>
                <div className="Filters__filtermenu__block">
                    <div className="Filters__filtermenu__block__title">Город:</div>
                    {cities && Array.isArray(cities) ?
                        <ul className="Filters__filtermenu__block__options" onClick={({ target }) => {
                            if (target.classList.contains('Filters__filtermenu__block__options__li')) {
                                if (params.has('cities') && params.get('cities').includes(target.dataset.city)) {
                                    params.set('cities', params.get('cities').replace(target.dataset.city+',',''));
                                } else {
                                    params.set('cities', ((params.get('cities') ?? "") + target.dataset.city+','));
                                }
                                if(params.get('cities').length == 0) params.delete('cities');

                                router.push(pathname + `?` + params.toString(), {scroll: false});
                                
                            }
                        }}>
                            {
                                cities.map((each, i) => {
                                    return (
                                        <li data-city={each} className={"Filters__filtermenu__block__options__li " 
                                        + ((params.has('cities') && params.get('cities').includes(each)) ? "Filters__filtermenu__block__options__li_select" : "")} key={each + i}>{each}</li>
                                    )
                                })
                            }
                        </ul> : <div>Ошибка загрузки фильтров</div>
                    }
                </div>
                <div className="Filters__filtermenu__block">
                    <div className="Filters__filtermenu__block__title">Избранное:</div>
                    <ul className="Filters__filtermenu__block__options" onClick={({ target }) => {
                        if (target.classList.contains('Filters__filtermenu__block__options__li')) {

                            if (params.has('favs') && params.get('favs') == target.dataset.favs) {
                                params.delete('favs');
                            } else {
                                params.set('favs', target.dataset.favs);
                            }
                            router.push(pathname + `?` + params.toString(), {scroll: false});

                        }
                    }}>
                        <li className={"Filters__filtermenu__block__options__li " 
                            + ((params.has('favs') && params.get('favs') == "true") ? "Filters__filtermenu__block__options__li_select" : "")} data-favs="true">Только избранное</li>
                        <li className={"Filters__filtermenu__block__options__li " 
                            + ((params.has('favs') && params.get('favs') == "false") ? "Filters__filtermenu__block__options__li_select" : "")} data-favs="false">Все кроме избранного</li>
                    </ul>
                </div>
                <div className="Filters__filtermenu__block">
                    <div className="Filters__filtermenu__block__title">Рейтинг:</div>
                    <div className="Filters__filtermenu__block__options Filters__filtermenu__block__options_rating">
                        <input className="Filters__filtermenu__block__options__input" type="number" value={rating.min} onChange={({ target }) => {

                            if(target.value.length <=3 && Number(target.value) <= 5) {
                                if(target.value != "" && rating.max != "" && Number(target.value) > rating.max) setRating((prev) => ({ ...prev, min: prev.max}));
                                    else setRating((prev) => ({ ...prev, min: target.value}));
                            }
                        }} />
                        —
                        <input className="Filters__filtermenu__block__options__input" type="number" value={rating.max} onChange={({ target }) => {

                            if(target.value.length <=3 && Number(target.value) <= 5 ) {
                                if(target.value != "" && Number(target.value) < rating.min) setRating((prev) => ({ ...prev, max: prev.min}));
                                    else setRating((prev) => ({ ...prev, max: target.value}));
                            }
                        }} />
                        <button className="Filters__filtermenu__block__options__submit" onClick={({ target }) => {
                            params.delete('rating');
                            if (rating.min || rating.max) params.set('rating', `${rating.min},${rating.max}`);
                            router.push(pathname + `?` + params.toString(), {scroll: false});
                        }}>ОК</button>
                    </div>
                </div>
            </div>
        </div>
    )
}