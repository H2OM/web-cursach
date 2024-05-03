'use client';
import Loader from '@/lib/basecomponents/loader/loader';
import '../voteform.scss';
import ClientContext from "@/lib/context/ClientContext";
import { useContext, useState } from "react";


export default function Voteform () {
    const {voteMenu, setVoteMenu, setNotification} = useContext(ClientContext);
    const [status, setStatus] = useState(false);
    const [select, setSelect] = useState(false);
    return (
        <div className={"Voteform " + ((voteMenu && Array.isArray(voteMenu)) ? "Voteform_show" : "")}>
            <button className="Voteform__close" onClick={()=>setVoteMenu(false)}></button>
            <h2 className="subtitle">Проголосуйте за лучшую достопримечательность</h2>
            <form className="Voteform__form" onSubmit={({target})=>{
                if(status && !select) return;
                setStatus(true);
                fetch('http://localhost/api/user/set-vote', {method: 'GET', cache: "no-cache"})
                    .then(data=>{
                        if(!data.ok) {
                            throw new Error();
                        }
                        return data.json();
                    })
                    .then(data=>{
                        setNotification((current)=>({...current, message: "Ваш голос учтен"}));
                    })
                    .catch(()=>{
                        setNotification((current)=>({...current, status: false, message: 'Непредвиденная ошибка, попробуйте перезагрузить страницу.'}));
                    })
                    .finally(()=>setVoteMenu(false));
                    
            }}>
                {
                    Array.isArray(voteMenu) && voteMenu.map((each, i)=>{

                        return (
                            <label className={"Voteform__form__block " + (select == each ? "Voteform__form__block_selected" : "")} key={each+i} htmlFor={each+i}>
                                <input className="Voteform__form__block__input" id={each+i} type="radio" name="voice" value={each}
                                    onClick={()=>setSelect(each)}/>
                                {each}
                            </label>
                        )
                    }) 
                }
                <button className="Voteform__form__submit" type="submit">{status ? <Loader/> : 'Проголосовать'}</button>
            </form>
        </div>

    )
}