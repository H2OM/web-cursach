import Uptitle from '@/lib/basecomponents/uptitle/uptitle';
import '../catalog.scss';
import Filters from '../client/Filters';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '../client/Pagination';
import { notFound} from 'next/navigation';
import Ratingbar from '@/lib/basecomponents/raitingbar/ratingbar';
import Addtofav from '@/lib/basecomponents/addtofav/addtofav';

export default async function Catalog ({searchParams}) {
    const page = (searchParams.page ?? 1);
    const params = new URLSearchParams(searchParams);
    const getCities = async () => {
        return await fetch('http://127.0.0.1/api/catalog/get-cities', {method: 'GET', cache: "no-cache"})
        .then(data=>{
            if(!data.ok) {
                return false;
            } 
            return data.json();
        }).catch(()=>false);
    }
    
    const getData = async () => {
        return await fetch('http://127.0.0.1/api/catalog/get-catalog' + (params.size > 0 ? ("?"+params.toString()) : "") , {method: 'GET', cache: "no-cache"})
        .then(data=>{
            if(!data.ok) {
                return false;
            } 
            return data.json();
        }).catch(()=>false);
    }
    
    let [data, cities] = await Promise.all([getData(), getCities()]);


    if(!data || data.data === undefined) {
        return notFound();
    }
    const blocks = data.data.map((each, i)=>{

        return (
            
            <div className="Catalog__grid__cart" key={each.article+i}>
                <Link href={"/catalog/"+each.article} >
                    <Image
                        src={"/img/"+each.image}
                        alt="image"
                        className="Catalog__grid__cart__image"
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                        quality={100}
                    />
                </Link>
                <div className="Catalog__grid__cart__desc">
                    <div className="Catalog__grid__cart__desc__up"><h3 className="subtitle">{each.title}</h3><Addtofav mini id={each.id}/></div>
                    <p className="Catalog__grid__cart__desc__text">{each.text.slice(0, 1200)+'...'}</p>
                </div>
                <div className="Catalog__grid__cart__rait"><Ratingbar rating={each.rating} voices={each.voices} mini id={each.id} id2={each.image}/></div>
            </div>
        )
    });

    return (
        <section className="Catalog">
            <div className="container">
                <Uptitle full><h1 className="title">Каталог достопримечательностей</h1></Uptitle>
                <Filters cities={cities}/>
                <div className="Catalog__grid">
                    {blocks}
                </div>
                {(!Number(data.pages) || data.pages == '1') ? null : <Pagination page={Number(page)} max={Number(data.pages)}/>}
            </div>
        </section>
    )
}