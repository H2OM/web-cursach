'use client';

import ClientContext from "@/lib/context/ClientContext";
import Image from "next/image";
import { useContext } from "react";

export default function Favmenuswitch () {
    const { favorites, switchFavMenu } = useContext(ClientContext);

    return (
        <div className="Header__flex__options__block" data-count={Object.keys(favorites).length} onClick={()=>{
            switchFavMenu(prev=>!prev);
        }}>
            <Image
                src="/svg/icon_star.svg"
                alt="star"
                className="Header__flex__options__icon Header__flex__options__icon_star"
                width={30}
                height={30}
                priority={true}
                quality={100}
            />
        </div>
    )
}