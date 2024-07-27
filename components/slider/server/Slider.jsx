import Movement from '@/lib/basecomponents/movement/movement';
import '../slider.scss';
import Image from 'next/image';
import GET_DATA from "@/lib/GETDATA/GET_DATA";

export default async function Slider() {
    const data = await GET_DATA({controller: 'slider', action: 'get-slider'});

    const slides = Array.isArray(data) ? data.map((each, i) => {

        return (
            <div className="Slider__slider__slide" key={each.image + i}>
                <div className="container">
                    <h1 className="title title_slide">{each.title}</h1>
                </div>
                <Image
                    src={"/img/" + each.image}
                    alt="slide"
                    className="Slider__slider__slide__image"
                    width={0}
                    height={0}
                    sizes='100vw'
                    priority={true}
                    quality={100}
                />
            </div>
        )
    }) : <div className='Error'>Ошибка загрузки</div>;

    return (
        <section className="Slider">
            <Movement>{slides}</Movement>
        </section>
    )
}