'use client';

import ClientContext from "@/lib/context/ClientContext";
import { useContext, useRef, useState } from "react";
import './miniform.scss';

export default function Miniform ({size}) {
    const {setNotification} = useContext(ClientContext);
    const [isSubmiting, setSubmiting] = useState(false);
    const mailRef = useRef(null);
    const [error, setError] = useState(false);

    return (
        <form className={"Miniform " + (isSubmiting ? "Miniform_submit " : "") + (size ? "Miniform_size " : "")} onSubmit={async (e)=>{
            e.preventDefault();
            let currentError = false;
            
            if(mailRef.current.value != '' && mailRef.current.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
                if(!error) setError(true);
                currentError = true;
            }
           
            if(currentError) {return;}
            setSubmiting(true);
            const formData = new FormData(e.target);
            await fetch('http://localhost/api/form/mail-subscribe', {method: 'POST',  body: formData})
                .then((data)=>{
                    if(!data.ok) {
                        setNotification((current)=>({...current, status: false}));
                    }
                    return data.json();
                })
                .then((respons)=>{
                    if(!respons.message) {throw new Error();}
                    setNotification((current)=>({...current, message: respons.message}));
                    e.target.reset();
                })
                .catch(()=>{
                    setNotification((current)=>({...current, status: false, message: 'Непредвиденная ошибка, попробуйте перезагрузить страницу.'}));
                })
                .finally(()=>setSubmiting(false));
        }}>
            <div className={"Miniform__input__wrap " + (size ? "Miniform__input__wrap_size " : "")}>
                <input ref={mailRef} className="Miniform__input " type="text" name="mail" placeholder="Ваша почта" required/>
                <label htmlFor="email" className={"Miniform__input__error " + (error ? "Miniform__input__error_show" : "")}>Неверный формат почты</label>
            </div>
            <button type="submit" className={"Miniform__button " + (isSubmiting ? "Miniform__button_submiting" : "")} disabled={isSubmiting}>Подписаться</button>
        </form>
    )
}