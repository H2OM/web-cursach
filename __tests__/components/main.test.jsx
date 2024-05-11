import customRender from "@/__mocks__/customRender";
import settingFetchResult from "@/__mocks__/fetchMock";
import Main from "@/components/main/server/Main";
import { screen } from "@testing-library/react";
import 'intersection-observer';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
jest.mock('next/navigation');
useRouter.mockReturnValue({
    push: jest.fn(),
}); 
usePathname.mockReturnValue("localhost");
useSearchParams.mockReturnValue({});
const context = {
    favorites: []
} 

describe('main test', ()=>{
    it('main render test', async ()=>{
        const titles = ['first', 'second', 'third', 'fourth'];
        const  setting = [];
        titles.forEach((each,i)=>{
            setting.push({
                title: each,
                image: '/img/image2.jpg',
                article: each,
                rating: 3,
                voices: 4,
                id: i
            });
        });
        settingFetchResult(setting);
        const {container} = customRender(await Main(), {providerProps: context});
        for(let title of titles) {
            expect(await screen.findByText(title)).toBeInTheDocument();
        }
        expect(await screen.findByText('Смотреть еще')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('main exeptions test', async ()=>{
        settingFetchResult(false);
        customRender(await Main(), {providerProps: {favorites: [2,3]}});
        expect(await screen.findByText('Ошибка загрузки')).toBeInTheDocument();
    });
});