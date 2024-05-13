import settingFetchResult from "@/__mocks__/fetchMock";
import 'intersection-observer';
import Catalog from "@/components/catalog/server/Catalog";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import customRender from "@/__mocks__/customRender";
import { screen } from "@testing-library/react";

jest.mock('next/navigation');
useRouter.mockReturnValue({
    push: jest.fn(),
}); 
usePathname.mockReturnValue("localhost");
useSearchParams.mockReturnValue({});

const context = {
    favorites: {
        2: ["Озеро Сукко", "Ozero Sukko", "catalog/kiparis_ozero.webp"],
    }
} 

describe('catalog testing', ()=>{
    it('catalog test',async ()=>{
        const blocks = ['one1', 'Озеро Сукко', 'one3']; 
        const cities = blocks.map((each, i)=>{
            return {
                article: each+i,
                image: '/img/image1.jpg',
                title: each,
                id: i,
                text: 'sometext',
                rating: 5,
                voices: 3
            }
        });
        function callback(recived) {
            if(recived.includes('catalog/get-cities')) {
                return ['somecity'];
            
            } else if (recived.includes('catalog/get-catalog')) {
                return {data: cities};
            }
        }
        settingFetchResult([], callback);
        const {container} = customRender(await Catalog({searchParams: ""}), {providerProps: context});
        for(let block of blocks) {
            expect(await screen.findByText(block)).toBeInTheDocument();
        }
        expect(container).toMatchSnapshot();
    });
});

