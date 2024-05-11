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
        5: ["Озеро Сукко", "Ozero Sukko", "catalog/kiparis_ozero.webp"],
    }
} 

describe('catalog testing', ()=>{
    it('catalog test',async ()=>{
        const blocks = ['one1', 'Озеро Сукко', 'one3']; 
        function callback(recived) {
            if(recived.includes('catalog/get-cities')) {
                return ['somecity'];
            
            } else if (recived.includes('catalog/get-catalog')) {
                return {data: [
                    {
                        article: 'one1',
                        image: '/img/image1.jpg',
                        title: blocks[0],
                        id: 3,
                        text: 'sometext',
                        rating: 5,
                        voices: 3
                    },
                    {
                        article: 'Ozero Sukko',
                        image: 'catalog/kiparis_ozero.webp',
                        title: blocks[1],
                        id: 5,
                        text: 'sometext',
                        rating: 5,
                        voices: 3
                    },
                    {
                        article: 'one3',
                        image: '/img/image1.jpg',
                        title: blocks[2],
                        id: 1,
                        text: 'sometext',
                        rating: 5,
                        voices: 3
                    },
                ]};
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

