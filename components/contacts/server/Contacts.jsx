import Uptitle from "@/lib/basecomponents/uptitle/uptitle";
import Image from 'next/image';
import '../contacts.scss';
import Miniform from "@/lib/basecomponents/miniform/miniform";

export default function Contacts () {

    return (
        <section className="Contacts">
            <div className="container">
                <Uptitle full><h1 className="title">Контакты</h1></Uptitle>
                <div className="Contacts__grid">
                    <div className="Contacts__grid__section">
                        <h2 className="subtitle">TopAttractions@gmail.com</h2>
                        <h2 className="subtitle">+7 900 111-11-11</h2>
                        <div className="Contacts__grid__section__icons">
                            <Image
                                src="/svg/icon_telegram.svg"
                                alt="tg"
                                className="Contacts__grid__section__icons__icon"
                                width={0}
                                height={0}
                                sizes='100vw'
                                priority={true}
                                quality={100}
                            />
                            <Image
                                src="/svg/icon_vk.svg"
                                alt="vk"
                                className="Contacts__grid__section__icons__icon"
                                width={0}
                                height={0}
                                sizes='100vw'
                                priority={true}
                                quality={100}
                            />
                        </div>
                    </div>
                    <div className="Contacts__grid__section">
                        <h2 className="subtitle">Подпишитесь на рассылку новостей</h2>
                        <Miniform size/>
                    </div>
                </div>
            </div>
        </section>
    )
}