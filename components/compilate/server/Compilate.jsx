import Image from 'next/image';
import Link from 'next/link';
import '../compilate.scss';
import Uptitle from '@/lib/basecomponents/uptitle/uptitle';
import Ratingbar from '@/lib/basecomponents/raitingbar/ratingbar';
import Movement from '@/lib/basecomponents/movement/movement';
import Addtofav from '@/lib/basecomponents/addtofav/addtofav';

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
            <div key={each.title+i}>
                <div className="Compilate__blocks__block" >
                    <Link href={'/catalog/'+each.article}>
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
                    </Link>
                    <div className="Compilate__blocks__block__split">
                        <div className="Compilate__blocks__block__split__up">
                            <div className="Compilate__blocks__block__split__up__ontitle">
                                <h3 className="subtitle">{each.title}</h3>
                                <Addtofav mini id={each.id} title={each.title} article={each.article} image={each.image} staronly/>
                            </div>
                            <Ratingbar rating={each.rating} voices={each.voices} mini id={each.id} id2={each.image}/>
                        </div>
                        <div className="Compilate__blocks__block__desc">{each.text}</div>
                    </div>
                </div>
            </div>
        )
    });


    return (
        <section className="Compilate">
            <div className="container">
                <Uptitle><h2 className="title">Подборка <br /> достопримечательностей</h2></Uptitle>
                <Movement blocks>{blocks}</Movement>
            </div>
        </section>
    )
}