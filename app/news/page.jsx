import News from "@/components/news/server/News";


export default function Page ({params, searchParams}) {
    return (
        <>
            <News full searchParams={searchParams}/>
        </>
    )
}