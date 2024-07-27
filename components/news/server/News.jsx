import Link from 'next/link';
import Image from 'next/image';
import '../news.scss';
import Uptitle from '@/lib/basecomponents/uptitle/uptitle';
import NewsBlock from './NewsBlock';
import LazyLoad from '../client/LazyLoad';
import GET_DATA from "@/lib/GETDATA/GET_DATA";

export default async function News ({full = false, searchParams = false}) {
    const count = (searchParams.count ?? 3);
    const data = await GET_DATA({
        controller: 'news',
        action: full ? `get-news?count=${count}` : 'last-news'
    });

    return (
        <section className="News">
            <div className="container">
                <Uptitle full={full}><h2 className="title">Новости</h2></Uptitle>
                <div className="News__blocks">
                    <NewsBlock data={data}/>
                    {full ? <LazyLoad val={data.length} /> : null}
                </div>
                {
                    !full ? 
                        <div className="News__end">
                            <Link href={"/news"} className="News__end__link">Смотреть все новости</Link>
                            <Image
                                src={"/svg/vector_arrow.svg"}
                                alt="arrow"
                                className="News__end__arrow"
                                width={20}
                                height={13}
                                sizes='100vw'
                                priority={true}
                                quality={100}
                                role='arrow'
                            />
                        </div>
                    : null
                }
            </div>
        </section>
    )

}