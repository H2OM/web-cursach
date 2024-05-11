import customRender from "@/__mocks__/customRender";
import settingFetchResult from "@/__mocks__/fetchMock";
import Compilate from "@/components/compilate/server/Compilate";
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
    favorites: {
        3: ["Озеро Сукко", "Ozero Sukko", "catalog/kiparis_ozero.webp"],
    }
} 

describe('compilate test', ()=>{
    it('compilate render test', async ()=>{
        const titles = ['first', 'second', 'Озеро Сукко', 'fourth'];
        const  setting = [];
        titles.forEach((each,i)=>{
            setting.push({
                title: each,
                image: 'catalog/kiparis_ozero.webp',
                article: each,
                rating: 3,
                voices: 4,
                id: i
            });
        });
        settingFetchResult(setting);
        const {container} = customRender(await Compilate(), {providerProps: context});
        for(let title of titles) {
            expect(await screen.findByText(title)).toBeInTheDocument();
        }
        expect(container).toMatchSnapshot();
    });
});