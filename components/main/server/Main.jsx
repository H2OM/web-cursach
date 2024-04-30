import Image from 'next/image';
import Link from 'next/link';
import '../main.scss';
import Uptitle from '@/lib/basecomponents/uptitle/uptitle';
import Ratingbar from '@/lib/basecomponents/raitingbar/ratingbar';

export default async function Main () {
    const data = await fetch('http://127.0.0.1/api/catalog/main-rating', {method: 'GET', cache: "no-cache"})
    .then(data=>{
        if(!data.ok) {
            return false;

        } 
        return data.json();
    }).catch(()=>false);

    const blocks = Array.isArray(data) ? data.map((each, i)=>{
        return (
            <Link href={'/catalog/'+each.article} key={each.article+i}>
                <div className="Main__blocks__block">
                    <Image
                        src={"/img/" + each.image}
                        alt="image"
                        className="Main__blocks__block__image"
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                        quality={100}
                    />
                    <div className="Main__blocks__block__split">
                        <div className="Main__blocks__block__split__up">
                            <h3 className="subtitle">{each.title}</h3>
                            <Ratingbar rating={each.rating} voices={each.voices} mini id={each.id} id2={each.image}/>
                        </div>
                        <div className="Main__blocks__block__desc">{each.text}</div>
                    </div>
                </div>
            </Link>
        )
    }) : <div className='Error'>Ошибка загрузки</div>;

    return (
        <section className="Main">
            <div className="container">
                <Uptitle><h2 className="title">Главные в рейтинге</h2></Uptitle>
                <div className="Main__blocks">
                    {blocks}
                </div>
                <Link href={"/catalog"}><button className="Main__button">Смотреть еще</button></Link>
            </div>
        </section>
    )
}