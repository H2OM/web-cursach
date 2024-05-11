'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function Pagination ({page, max}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    if(max == 1) return;
    
    return (
        <nav className="Catalog__nav" onClick={({target})=>{
            if(target.classList.contains("Catalog__nav__point") && !target.classList.contains("Catalog__nav__point_select")) {
                params.set('page', target.textContent);
                router.push(pathname+'?'+ params.toString());
            }
        }}>
            <>
                {
                    page > 4 ? 
                        <>
                            {
                                (page-(6 - (max-page))) < 3 ? null : 
                                    <><div className="Catalog__nav__point">1</div>
                                    <div className="Catalog__nav__space">...</div></>
                            }
                            {   
                                max - page >= 5 ? 
                                    <>
                                        <div className="Catalog__nav__point">{page - 2}</div>
                                        <div className="Catalog__nav__point">{page - 1}</div>
                                    </> : 
                                    Array.from({length: (6 - (max - page))}).map((_, i)=>{    //перед
                                        return (
                                            <div className="Catalog__nav__point" key={10+i}>{page-(6 - (max-page))+i}</div>
                                        )
                                    }) 
                            }
                            <div className="Catalog__nav__point Catalog__nav__point_select">{page}</div>
                        </> 
                        :
                        Array.from({length: page}).map((_, i)=>{ 
                            return (
                                <div className={"Catalog__nav__point" + ((page == i+1) ? " Catalog__nav__point_select" : "")} key={20+i}>{i+1}</div>
                            )
                        }) 
                }
                {
                    Array.from({length: ((max - page) < 7 ? max - page : 5)}).map((_, i)=>{ //после
                                                
                        return (
                            <div className="Catalog__nav__point" key={30+i}>{page+i+1}</div>
                        )
                    }) 
                }
                {
                    max - page >= 7 ?
                        <>
                            <div className="Catalog__nav__space">...</div>
                            <div className="Catalog__nav__point">{max}</div>
                        </>
                            : null
                }
            </>
        </nav>
    )
}