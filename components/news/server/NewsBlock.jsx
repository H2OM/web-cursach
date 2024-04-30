import Image from "next/image";

export default function NewsBlock({data}) {
    return Array.isArray(data) ? data.map((each, i)=>{
        return (
            <div className="News__blocks__block" key={each.date+i}>
                <div className="News__blocks__block__split">
                    <h3 className="subtitle">{each.title}</h3>
                    <div className="News__blocks__block__date">{each.date}</div>
                </div>
                <div className="News__blocks__block__split">
                    <div className="News__blocks__block__desc">{each.text}</div>
                    <Image
                        src={"/img/" + each.image}
                        alt="image"
                        className="News__blocks__block__image"
                        width={0}
                        height={0}
                        sizes='100vw'
                        priority={true}
                        quality={100}
                    />
                </div>
            </div>
        )
    }) : <div className='Error'>Ошибка загрузки</div>;
}