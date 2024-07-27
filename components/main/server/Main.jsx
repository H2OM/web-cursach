import Image from 'next/image';
import Link from 'next/link';
import '../main.scss';
import Uptitle from '@/lib/basecomponents/uptitle/uptitle';
import Ratingbar from '@/lib/basecomponents/raitingbar/ratingbar';
import Addtofav from '@/lib/basecomponents/addtofav/addtofav';
import GET_DATA from "@/lib/GETDATA/GET_DATA";

export default async function Main() {
    const data = await GET_DATA({controller: 'catalog', action: 'main-rating'});

    const blocks = Array.isArray(data) ? data.map((each, i) => {
        return (
            <div className="Main__blocks__block" key={each.article + i}>
                <Link href={'/catalog/' + each.article}>
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
                </Link>
                <div className="Main__blocks__block__split">
                    <div className="Main__blocks__block__split__up">
                        <div className="Main__blocks__block__split__up__ontitle">
                            <h3 className="subtitle">{each.title}</h3>
                            <Addtofav mini id={each.id} title={each.title} article={each.article} image={each.image}
                                      staronly/>
                        </div>
                        <Ratingbar rating={each.rating} voices={each.voices} mini id={each.id} id2={each.image}/>
                    </div>
                    <div className="Main__blocks__block__desc">{each.text}</div>
                </div>
            </div>
        )
    }) : <div className='Error'>Ошибка загрузки</div>;

    return (
        <section className="Main">
            <div className="container">
                <Uptitle><h2 className="title">Главные в рейтинге</h2></Uptitle>
                <div className="Main__blocks">
                    {blocks}
                </div>
                <Link href={"/catalog"}>
                    <button className="Main__button">Смотреть еще</button>
                </Link>
            </div>
        </section>
    )
}