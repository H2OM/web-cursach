import customRender from "@/__mocks__/customRender";
import News from "@/components/news/server/News";
import 'intersection-observer';
import { screen } from "@testing-library/react";
import settingFetchResult from "@/__mocks__/fetchMock";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

jest.mock('next/navigation');
useRouter.mockReturnValue({
    push: jest.fn(),
}); 
usePathname.mockReturnValue("localhost");
useSearchParams.mockReturnValue({});

describe('news',()=>{

    it('full news', async ()=>{
        const titles = ['some1', 'some2', 'some3'];
        settingFetchResult([
            {
                date: "22.02.22",
                title: titles[0],
                text: "sometext",
                image: "/img/image.png"
            },
            {
                date: "22.02.52",
                title: titles[1],
                text: "sometext2",
                image: "/img/image.png"
            },
            {
                date: "22.02.24",
                title: titles[2],
                text: "sometex4t",
                image: "/img/image.png"
            },
        ]);
        const {container} = customRender(await News({full: true}), {});
        for(let title of titles) {
            expect(await screen.findByText(title)).toBeInTheDocument();
        }
        expect(container).toMatchSnapshot();
    });
    it('lite news', async ()=>{
        settingFetchResult([]);
        customRender(await News({full: false}), {});
        expect(await screen.findByText('Смотреть все новости')).toBeInTheDocument();
        expect(await screen.findByRole('arrow')).toBeInTheDocument();
    });
    it('full news exeptions', async ()=>{
        settingFetchResult([]);
        customRender(await News({full: true}), {});
        expect(await screen.findByText('Нет новостей')).toBeInTheDocument();
        expect(await screen.findByRole('anchor')).toBeInTheDocument();
        settingFetchResult(false);
        customRender(await News({full: true}), {});
        expect(await screen.findByText('Ошибка загрузки')).toBeInTheDocument();
    });
});

