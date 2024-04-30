import Image from 'next/image';
import Link from 'next/link';
import '../compilate.scss';
import Uptitle from '@/lib/basecomponents/uptitle/uptitle';
import Ratingbar from '@/lib/basecomponents/raitingbar/ratingbar';
import Movement from '@/lib/basecomponents/movement/movement';

export default async function Compilate () {
    
    const data = await fetch('http://127.0.0.1/api/catalog/main-compilate', {method: 'GET', cache: "no-cache"})
    .then(data=>{
        if(!data.ok) {
            return false;

        }
        return data.json();
    }).catch(()=>false);
    
    if(!data || !Array.isArray(data)) {
        return;
    }

    const blocks = data.map((each, i)=>{
        return (
            <Link href={'/catalog/'+each.article} key={each.article+i}>
                <div className="Compilate__blocks__block" key={each.title+i}>
                    <Image
                        src={"/img/" + each.image}
                        alt="image"
                        className="Compilate__blocks__block__image"
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                        quality={100}
                    />
                    <div className="Compilate__blocks__block__split">
                        <div className="Compilate__blocks__block__split__up">
                            <h3 className="subtitle">{each.title}</h3>
                            <Ratingbar rating={each.rating} voices={each.voices} mini id={each.id} id2={each.image}/>
                        </div>
                        <div className="Compilate__blocks__block__desc">{each.text}</div>
                    </div>
                </div>
            </Link>
           
        )
    });


    return (
        <section className="Compilate">
            <div className="container">
                <Uptitle><h2 className="title">Подборка <br /> достопримечательностей</h2></Uptitle>
                <Movement slides={blocks} blocks/>
            </div>
        </section>
    )
}