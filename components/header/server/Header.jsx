import '../header.scss';
import Image from 'next/image';
import Link from 'next/link';
import Favmenu from '../client/Favmenuswitch';
import Favmenuswitch from '../client/Favmenuswitch';
import Searchbar from '../client/Searchbar';


export default function Header () {

    return (
        <header className='Header'>
            <div className="Header__flex container container_head">
                <Link href={"/"}>
                    <Image
                        src="/img/logo_smal.png"
                        alt="Logotype"
                        className="Header__flex__logo"
                        width={0}
                        height={0}
                        sizes='100vh'
                        priority={true}
                        quality={100}
                    />
                </Link>
                <div className="Header__flex__links">
                    <Link href="/catalog" className="smalltitle Header__flex__links__link">Каталог</Link>
                    <Link href="/news" className="smalltitle Header__flex__links__link">Новости</Link>
                    <Link href="/contacts" className="smalltitle Header__flex__links__link">Контакты</Link>
                </div>
                <div className="Header__flex__options">
                    <Searchbar/>
                    <Favmenuswitch/>
                </div>
            </div>
        </header>
    )
}