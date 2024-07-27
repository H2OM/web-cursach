'use client';

import ClientContext from "@/lib/context/ClientContext";
import MaskInput from "@/lib/inputMask/InputMask";
import { useContext, useEffect, useRef, useState } from "react";

export default function ClientForm () {
    const {setNotification} = useContext(ClientContext);
    const [isSubmiting, setSubmiting] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [check, setCheck] = useState(false);
    const mailRef = useRef(null);
    const phoneRef = useRef(null);
    const [errors, setErrors] = useState({
        mail: false,
        phone: false,
        name: false,
        agreement: false
    });

    const formSubmitHandler = async (e) =>{
        e.preventDefault();
        let error = false;
        if (!check) {
            if(!errors.agreement) setErrors((prev)=>({...prev, agreement: true}));
            error = true;
        }
        if(RegExp(/_/).test(phoneRef.current.value)) {
            if(!errors.phone) setErrors((prev)=>({...prev, phone: true}));
            error = true;
        }
        if(mailRef.current.value != '' && mailRef.current.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
            if(!errors.mail) setErrors((prev)=>({...prev, mail: true}));
            error = true;
        }
        if(nameInput.length < 3 || nameInput.length > 70) {
            if(!errors.name) setErrors((prev)=>({...prev, name: true}));
            error = true;
        }
        if(errors.name && nameInput.length >= 3 && nameInput <= 70) {
            setErrors((prev)=>({...prev, name: false}));
        }
        if(error) {return;}
        setSubmiting(true);
        const formData = new FormData(e.target);
        await fetch('/api/form/form-callback', {method: 'POST',  body: formData})
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
                setNameInput('');
            })
            .catch(()=>{
                setNotification((current)=>({...current, status: false, message: 'Непредвиденная ошибка, попробуйте перезагрузить страницу.'}));
            })
            .finally(()=>setSubmiting(false));
    }

   
    useEffect(()=>{
        if(nameInput.match(/^\s+|.*\s{3,}/g) !== null) {
            setNameInput((prev)=> prev.replace(/^\s+/g, '').replace(/\s{3,}/g, '  '));
        }
        if(nameInput.match(/([А-Яа-я]+[ ]{0,})+/g) === null) setNameInput('');
        else if(nameInput.match(/([А-Яа-я]+[ ]{0,})+/g) !== null && nameInput.match(/([А-Яа-я]+[ ]{0,})+/g)[0].length != nameInput.length) {
            setNameInput((prev)=>prev.match(/([А-Яа-я]+[ ]{0,})+/g).join(''));
        }
    }, [nameInput]);

    return (
        <form className={"Form__form" + (isSubmiting ? " Form__form_submit" : "")} onSubmit={formSubmitHandler}> 
            {isSubmiting ? <div className="Form__form__blur"></div> : null}
            <label role="error" htmlFor="name" className={"Form__form__input__error " + (errors.name ? "Form__form__input__error_show" : "")}>Неверный формат имени</label>
            <input className="Form__form__input" value={nameInput} name="name" type="text" 
                minLength={3} maxLength={70} placeholder="Ваше имя" required
                onChange={(e)=>{
                    e.preventDefault();
                    setNameInput(e.target.value);
                    if(errors.name && nameInput.length >= 3 && nameInput.length <= 70) {
                        setErrors((prev)=>({...prev, name: false}));
                    }
                }}/>
            
            <label role="error" htmlFor="email" className={"Form__form__input__error " + (errors.mail ? "Form__form__input__error_show" : "")}>Неверный формат почты</label>
            <input ref={mailRef} className="Form__form__input" name="mail" type="email" placeholder="Ваша почта" 
                onChange={()=>{
                    if(errors.mail && mailRef.current.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) !== null) {
                        setErrors((prev)=>({...prev, mail: false}));
                    }
                }}/>
            <label role="error" htmlFor="number" className={"Form__form__input__error " + (errors.phone ? "Form__form__input__error_show" : "")}>Неверный номер телефона</label>
            <MaskInput inputRef={phoneRef} error={errors.phone} setError={setErrors} className={"Form__form__input"} name={"number"} placeholder={"Номер телефона"} always={false}/>
            <textarea className="Form__form__input Form__form__input_area" name="question" cols="30" rows="10" minLength={10} maxLength={1200} placeholder="Какой у вас вопрос?" required/>
            <div className="Form__form__radio">
                <label htmlFor="agreement" className={"Form__form__radio__label " + (errors.agreement ? "Form__form__radio__label_error" : "")}>Подтверждение обработки данных</label>
                <input type="checkbox" name="agreement" className="Form__form__input Form__form__input_radio"
                checked={check} onChange={({target})=>{
                    setCheck(target.value);
                    if(target.value) setErrors((prev)=>({...prev, agreement: false}));                        
                }}/>
            </div>
            <button className={"Form__form__submit" + (isSubmiting ? " Form__form__submit_submiting" : "")} type="submit" 
                disabled={isSubmiting}>
                    Отправить
            </button>
        </form>
    )
}