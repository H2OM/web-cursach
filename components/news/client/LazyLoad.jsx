'use client';

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Loader from '@/lib/basecomponents/loader/loader';
import { useRouter, usePathname, useParams } from "next/navigation";

export default function LazyLoad ({ val }) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const {ref, inView} = useInView();
    const [current, setCurrent] = useState(0);
    const [status, setStatus] = useState(false);
    
    useEffect(()=>{
        setStatus(false);
    }, [params]);


    useEffect(()=>{
        if((val > current) && inView) {
            setCurrent(prev=>prev+3);
            router.push(pathname+`?count=${Number(val)+3}`, {scroll: false});
            setStatus(true);
        }
    }, [inView]);

    return (
        <>
            {status === true ? <Loader/> : null}
            <div ref={ref} role="anchor" className="News__blocks__loadAnchor"></div>
        </>
    )
}