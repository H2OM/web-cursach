import Compilate from "@/components/compilate/server/Compilate";
import Form from "@/components/form/server/Form";
import Main from "@/components/main/server/Main";
import News from "@/components/news/server/News";
import Slider from "@/components/slider/server/Slider";

export default function Home() {
    return (
        <>
            <Slider/>
            <News/>
            <Main/>
            <Compilate/>
            <Form/>
        </>
    );
}
