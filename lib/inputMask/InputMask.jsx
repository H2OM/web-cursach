'use client';
import { useContext, useEffect, useState } from "react"
import ClientContext from "../context/ClientContext";

export default function MaskInput ({className, name, inputRef, error = false, setError = false, placeholder = false, required = false, baseValue =false, always = false}) {
    const [phoneMask, setMask] = useState(baseValue || "+_ (___) ___-__-__");
    const [lastNumber, setLastNumber] = useState(baseValue ? baseValue[baseValue.length - 1] : '');
    const {notification} = useContext(ClientContext);
    useEffect(()=>{
        if(notification.status && notification.message) {setMask("+_ (___) ___-__-__"); setLastNumber(''); inputRef.current.value = '';}
    }, [notification]);

    return <input ref={inputRef} data-target="имя" className={className} name={name} type="text" required={required} placeholder={placeholder} 
        onFocus={(e)=>{
            inputRef.current.value = phoneMask;
        }}
        onBlur={()=>{
            if((phoneMask == "+_ (___) ___-__-__" || phoneMask == baseValue) && !always) {
                inputRef.current.value = '';
            }
        }}
        onClick={(e)=>{
            inputRef.current.setSelectionRange(phoneMask.indexOf('_'),phoneMask.indexOf('_'));
        }}
        onKeyDown={(e)=>{
            if (e.key == "Backspace" && lastNumber != "+") {
                e.preventDefault();
                let tempMask = phoneMask.split('');
                let indexLastNumber = tempMask.lastIndexOf(lastNumber);
                let tempNumber;
                for( let i = indexLastNumber-1;i>0;i--) {
                    tempNumber = tempMask[i];
                    if(tempNumber == '-' ||tempNumber == ' ' || tempNumber == ')' || tempNumber == '(') {
                        continue;
                    } else {
                        break;
                    }
                }
                setLastNumber(tempNumber);
                tempMask[indexLastNumber] = '_';
                tempMask = tempMask.join('');
                setMask(tempMask);
                inputRef.current.value = tempMask;
                inputRef.current.setSelectionRange(tempMask.indexOf('_'),tempMask.indexOf('_'));
            } else if(e.key != undefined && RegExp(/_/).test(phoneMask) && (e.key).replace(/([^\d]|\,)/gi, '').length == e.key.length) {
                setMask(phoneMask.replace(/_/, e.key));
                setLastNumber(e.key);
            }
        }}
        onChange={()=>{
            inputRef.current.value = phoneMask;
            inputRef.current.setSelectionRange(phoneMask.indexOf('_'),phoneMask.indexOf('_'));
            if(error && !RegExp(/_/).test(inputRef.current.value)) {
                setError((prev)=>({...prev, phone: false}));
            }
        }}
    />

}