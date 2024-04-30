import Miniform from '@/lib/basecomponents/miniform/miniform';
import '../footer.scss';
import Image from 'next/image';
import Link from 'next/link';
export default function Footer () {

    return (
        <footer className="Footer">
            <div className="container Footer__grid">
                <div className="Footer__block">
                    <Image
                        src="/img/logo_medium.png"
                        alt="logo"
                        className="Footer__logo"
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                        quality={100}
                    />
                    <div className="Footer__block__section">
                        <h3 className="subtitle">Контакты</h3>
                        <div className="Footer__block__section__desc">TopAttractions@gmail.com</div>
                        <div className="Footer__block__section__desc">+7 900 111-11-11</div>
                        <div className="Footer__block__section__icons">
                            <Image
                                src="/svg/icon_telegram.svg"
                                alt="tg"
                                className="Footer__block__section__icons__icon"
                                width={0}
                                height={0}
                                sizes='100vw'
                                priority={true}
                                quality={100}
                            />
                            <Image
                                src="/svg/icon_vk.svg"
                                alt="vk"
                                className="Footer__block__section__icons__icon"
                                width={0}
                                height={0}
                                sizes='100vw'
                                priority={true}
                                quality={100}
                            />
                        </div>
                        
                    </div>
                    <div className="Footer__block__section">
                        <h3 className="subtitle">Подпишитесь на новости</h3>
                        <Miniform/>
                    </div>
                </div>
                <div className="Footer__block Footer__block_second">
                    <Link className="Footer__block__link" href={"/"}>Политика конфиденциальности</Link>
                    <div className="Footer__block__section__desc" href={"/"}>© TopAttractions, 2024</div>
                </div>
            </div>
        </footer>
    )
}