'use client';
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const ClientContext = createContext();

export const ClientProvider = ({children}) => {
    const pathname = usePathname();
    const [pages, setPages] = useState([]);
    const [notification, setNotification] = useState({message: false, status: true, closing: false });
    const [favorites, setFavorites] = useState('loading');
    const [favMenu, switchFavMenu] = useState(false);
    const [searchMenu, switchSearchMenu] = useState(false);
    const [searchMenuContent, setSearchMenuContent] = useState([]);
    const [voteMenu, setVoteMenu] = useState(false);

    useEffect(()=>{
            if(notification.message && !notification.closing) {
                setNotification((current)=>({...current, closing: true}));
                setTimeout(()=>setNotification({message: false, status: true, closing: false}), 4000);

        }
    }, [notification]);

    useEffect(()=>{
        let type = (pathname == "/" ? "main" : pathname.includes("catalog") ? "catalog" : pathname);

        if(pages && !pages.includes(type)) {
            setPages(prev=>[...prev, type]);

            fetch('http://localhost/api/metric/increase-'+type.replace("/", ""), {method: 'GET', cache: "no-cache"})
                .then(data=>{
                    if(!data.ok) {
                        throw new Error();
                    }
                })
                .catch(()=>setPages(false));
        }

    }, [pathname]);


    useEffect(()=>{
        fetch('http://localhost/api/vote/check-vote', {method: 'GET', cache: "no-cache"})
            .then(data=>{
                if(!data.ok) {
                    throw new Error();
                }
                return data.json();
            })
            .then(data=>{
                setVoteMenu(data);
            })
            .catch(()=>setVoteMenu(false));

        fetch('http://localhost/api/user/get-fav', {method: 'GET', cache: "no-cache"})
        .then(data=>{
            if(!data.ok) {
                throw new Error();
            }
            return data.json();
        })
        .then(data=>{
            setFavorites(data);
        })
        .catch(()=>setFavorites([]));
    }, []);

    
    return (
        <ClientContext.Provider
            value={{
                setNotification,
                notification,
                favorites,
                setFavorites,
                favMenu,
                switchFavMenu,
                searchMenu,
                switchSearchMenu,
                searchMenuContent,
                setSearchMenuContent,
                voteMenu,
                setVoteMenu
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}

export default ClientContext;