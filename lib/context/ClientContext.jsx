'use client';
import { createContext, useEffect, useState } from "react";

const ClientContext = createContext();

export const ClientProvider = ({children}) => {
   const [notification, setNotification] = useState({message: false, status: true, closing: false });
   useEffect(()=>{
        if(notification.message && !notification.closing) {
            setNotification((current)=>({...current, closing: true}));
            setTimeout(()=>setNotification({message: false, status: true, closing: false}), 4000);
        }
    }, [notification]);

    return (
        <ClientContext.Provider
            value={{
                setNotification,
                notification
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}

export default ClientContext;