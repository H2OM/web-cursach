'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Sort () {
    const [sortMenu, setSortMenu] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    let currentSort = "";
    
    if(params.has("sort")) {
        switch(params.get("sort")) {
            case "name_asc": currentSort = "По алфавиту А-Я"; break;
            case "name_desc": currentSort = "По алфавиту Я-А"; break;
            case "rating_desc": currentSort = "По рейтингу 5-0"; break;
            case "rating_asc": currentSort = "По рейтингу 0-5"; break;
            default: currentSort = "Не выбрано"; break;
        } 
    } else currentSort = "Не выбрано";

    return (
        <>
            <div className="Filters__sort">
                <button className="Filters__sort__main" onClick={() => setSortMenu(prev => !prev)}>
                    Сортировать: {currentSort}
                    <svg style={sortMenu ? {transform:"rotate(180deg)"} : {}} className="Filters__sort__main__svg" width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.42578 14.6609L0.346544 0.667265L16.505 0.667267L8.42578 14.6609Z" fill="white" />
                    </svg>
                </button>
            </div>
            <div className={"Filters__filtermenu Filters__filtermenu_sort " + (sortMenu ? "Filters__filtermenu_sort_show" : "")}>
                <ul className="Filters__filtermenu__block__options" onClick={({ target }) => {
                    if (target.classList.contains('Filters__filtermenu__block__options__li')) {
                        if (params.has('sort') && params.get('sort') == target.dataset.sort) {
                            params.delete('sort');
                        } else {
                            params.set('sort', target.dataset.sort);
                        }

                        router.push(pathname + `?` + params.toString(), {scroll: false});
                    }
                }}>
                    <li className={"Filters__filtermenu__block__options__li " 
                        + ((params.has('sort') && params.get('sort') == "name_asc") ? "Filters__filtermenu__block__options__li_select" : "")} data-sort="name_asc">По алфавиту А-Я</li>
                    <li className={"Filters__filtermenu__block__options__li " 
                        + ((params.has('sort') && params.get('sort') == "name_desc") ? "Filters__filtermenu__block__options__li_select" : "")} data-sort="name_desc">По алфавиту Я-А</li>
                    <li className={"Filters__filtermenu__block__options__li " 
                        + ((params.has('sort') && params.get('sort') == "rating_desc") ? "Filters__filtermenu__block__options__li_select" : "")} data-sort="rating_desc">По рейтингу 5-0</li>
                    <li className={"Filters__filtermenu__block__options__li " 
                        + ((params.has('sort') && params.get('sort') == "rating_asc") ? "Filters__filtermenu__block__options__li_select" : "")} data-sort="rating_asc">По рейтингу 0-5</li>
                </ul>
            </div>
        </>
    )
}