'use client';
import Loader from '@/lib/basecomponents/loader/loader';
import '../voteform.scss';
import ClientContext from "@/lib/context/ClientContext";
import { useContext, useEffect, useState } from "react";


export default function Voteform () {
    const {voteMenu, setVoteMenu, setNotification} = useContext(ClientContext);
    const [status, setStatus] = useState(false);
    const [select, setSelect] = useState(false);

    useEffect(()=>{
        if(voteMenu && Array.isArray(voteMenu)) {
            document.querySelector('body').style.overflow = "hidden";
        } else {
            document.querySelector('body').style.overflow = "";
        }
    }, [voteMenu]);

    return (
        <div className={"Voteform "  + ((voteMenu && Array.isArray(voteMenu)) ? "Voteform_show" : "")}>
            <button className="Voteform__close" onClick={()=>setVoteMenu(false)}></button>
            <h2 className="subtitle">{status == "voted" ? "Результаты голосования" : "Проголосуйте за лучшую достопримечательность"}</h2>
            {
                status == "voted" ? 
                    <div className="Voteform__form">
                        {Array.isArray(voteMenu) && voteMenu.map((each, i)=>{
                            return (
                                <div className={"Voteform__form__block Voteform__form__block_e " + (each.selected !== undefined ? "Voteform__form__block_selected" : "") } key={each.city+i}>
                                    {each.city} <span>{each.count}</span>
                                </div>
                            )

                        })}
                    </div> :
                    <form className="Voteform__form" onSubmit={(e)=>{
                        e.preventDefault();
                        if(status === true && !select) return;
                        setStatus(true);
                        const formData = new FormData(e.target);
                        fetch('http://localhost/api/vote/set-vote', {method: 'POST', body: formData, cache: "no-cache"})
                            .then(data=>{
                                if(!data.ok) {
                                    throw new Error();
                                }
                                return data.json();
                            })
                            .then(data=>{
                                setStatus('voted');
                                setVoteMenu(data);
                                setNotification((current)=>({...current, message: "Ваш голос учтен"}));
                            })
                            .catch(()=>{
                                setNotification((current)=>({...current, status: false, message: 'Непредвиденная ошибка, попробуйте перезагрузить страницу.'}));
                                setVoteMenu(false);
                            })
                            
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
            }
        </div>

    )
}