import settingFetchResult from "@/__mocks__/fetchMock";
import { render, screen } from "@testing-library/react";
import Slider from "@/components/slider/server/Slider";
import customRender from "@/__mocks__/customRender";

describe('Slider testing', ()=>{
    it('slider success testing',async ()=>{
        const blocks = ['one1', 'one2', 'one3', 'one4']; 
        const slids = [];
        blocks.forEach((each,i)=>{
            slids.push({
                image: 'some'+i,
                title: each
            });
        });
        
        settingFetchResult(slids);
        const {container} = customRender(await Slider(), {});
        const images = screen.getAllByRole('img');

        expect(images.length).toBe(4);
        for(let block of blocks) {
            expect(await screen.findByText(block)).toBeInTheDocument();
        }

        expect(container).toMatchSnapshot();
    });
    it('slider exeption test', async()=>{
        settingFetchResult(false);
        customRender(await Slider(), {});
        expect(screen.getByText('Ошибка загрузки')).toBeInTheDocument();
    });

});

