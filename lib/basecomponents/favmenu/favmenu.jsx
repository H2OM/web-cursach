'use client';

import ClientContext from "@/lib/context/ClientContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import Addtofav from "../addtofav/addtofav";
import './favmenu.scss';

export default function Favmenu () {
    const { favorites, favMenu } = useContext(ClientContext);

    return (
        <div className={"Favmenu " + (favMenu ? "Favmenu_show" : "")}>
            <div className="Favmenu__list">
                {
                    favorites !== 'loading' ?
                        (Object.keys(favorites).length > 0 ?
                        Object.keys(favorites).map((key,i)=>{
                            return (
                                <div className="Favmenu__list__block" key={key}>
                                    <div className="Favmenu__list__block__split">
                                        <Link href={'/catalog/'+favorites[key][1]}>
                                            <Image
                                                src={"/img/"+favorites[key][2]}
                                                alt="image"
                                                className="Favmenu__list__block__image"
                                                width={300}
                                                height={300}
                                                priority={true}
                                                quality={100}
                                            />
                                        </Link>
                                        {favorites[key][0]}
                                    </div>
                                    <Addtofav mini staronly id={key} title={favorites[key][0]} article={favorites[key][1]} image={favorites[key][2]}/>
                                </div>
                            )
                        }) : <div className="Favmenu__list__miss">У вас нет избранных мест</div> ) : null
                }
            </div>
        </div>      

    )
}