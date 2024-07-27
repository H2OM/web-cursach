'use client';

import ClientContext from "@/lib/context/ClientContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Searchbar () {
    const { switchFavMenu, switchSearchMenu, setSearchMenuContent } = useContext(ClientContext);
    const [queue, setQueue] = useState(null);
    const [status, setStatus] = useState(false);

    const search = (content) =>{
        
        const temp = (queue !== null ? queue : content);
        setQueue(null);
        if(temp.length < 3) {
            setStatus(false);
            return;
        }
        fetch('/api/catalog/getby-search?content='+temp, {method: 'GET', cache: "no-cache"})
        .then(data=>{
            if(!data.ok) {
                throw new Error();
            }
            
            return data.json();

        }).then(data=>{
            setSearchMenuContent(data);
            setStatus(false);
           
        }).catch(()=>setStatus('error'));
        
    }

    useEffect(()=>{
        if(!status && queue !== null) {
            const temp = queue;
            setQueue(null);
            setStatus(true);
            search(temp);
            
        }
    }, [status]);

    return (
        <div className="Header__flex__options__block">
            <input type="text" placeholder='Поиск...' className='Header__flex__options__input' name='searching' 
                onFocus={()=>{
                    switchFavMenu(false);
                    switchSearchMenu(true);
                }}
                onBlur={()=>{
                    setTimeout(()=>{switchSearchMenu(false)},200);
                }}
                onChange={({target})=>{
                    if(target.value.length > 3 && status != 'error') {
                        if(status) {
                            setQueue(target.value);
                        } else {
                            setStatus(true);
                            setTimeout(()=>{
                                search(target.value);
                            }, 2000);
                        }
                    } else {
                        setSearchMenuContent([]);
                    }
                }}
            />
            <Image
                src="/svg/icon_magnifier.svg"
                alt="magnifier"
                className="Header__flex__options__icon"
                width={30}
                height={30}
                priority={true}
                quality={100}
            />
        </div>
    )
}