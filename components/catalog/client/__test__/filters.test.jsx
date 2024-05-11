import Filters from "@/components/catalog/client/Filters";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { render, screen } from "@testing-library/react";
jest.mock('next/navigation');
useRouter.mockReturnValue({
    push: jest.fn(),
}); 
usePathname.mockReturnValue("localhost");
useSearchParams.mockReturnValue({});

const urlparams = new URLSearchParams("rating=1,2&cities=city1,second&fav=true&sort=name_asc");
global.URLSearchParams = jest.fn(x => (urlparams));

describe('test filters', ()=>{
    it('filters', async ()=>{
        const cities = ['city1', 'city2', 'city3'];
        const {container} = render(<Filters cities={cities}/> )
        for(let city of cities) {
            expect(await screen.findByText(city)).toBeInTheDocument();
        }
        const favs = await screen.findAllByText(/(Все кроме избранного){1}|(Только избранное){1}/);
        expect(favs.length).toBe(2);
        const inputs = screen.getAllByRole('ratinginput');
        expect(inputs.length).toBe(2);
        expect(inputs[0].value).toBe("1");
        expect(inputs[1].value).toBe("2");

        expect(await screen.findByText('Сортировать: По алфавиту А-Я')).toBeInTheDocument();

        expect(container).toMatchSnapshot();

    });
});