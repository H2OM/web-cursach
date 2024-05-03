'use client';
import { useContext } from 'react';
import './searchmenu.scss';
import ClientContext from '@/lib/context/ClientContext';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchMenu () {
    const {searchMenu, searchMenuContent} = useContext(ClientContext);

    return (
        <div className={"Searchmenu " + ((searchMenu && Array.isArray(searchMenuContent) && searchMenuContent.length > 0) ? "Searchmenu_show" : "")}>
            <div className="Searchmenu__list">
                {
                    Array.isArray(searchMenuContent) ? searchMenuContent.map((each,i)=>{
                        return (
                            <div className="Searchmenu__list__block" key={each.article}>
                                <Link href={'/catalog/'+each.article}>
                                    <Image
                                        src={"/img/"+each.image}
                                        alt="image"
                                        className="Favmenu__list__block__image"
                                        width={300}
                                        height={300}
                                        priority={true}
                                        quality={100}
                                    />
                                </Link>
                                {each.title}
                            </div>
                        ) 
                    }): null
                }
            </div>
        </div>      
       
    )
}