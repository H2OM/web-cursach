import { render, screen } from "@testing-library/react";
import customRender from "@/__mocks__/customRender";
import userEvent from "@testing-library/user-event";
import settingFetchResult from "@/__mocks__/fetchMock";
import Addtofav from "../addtofav";
const context = {
    favorites: {
        2: ["Озеро Сукко", "Ozero Sukko", "catalog/kiparis_ozero.webp"],
        4: ["city", "citytest", "/img/image.jpg"]
    },
    setFavorites (val) { this.favorites = val},
}

describe('test add to Favorites', ()=>{
    
    it('test render', async ()=>{
        const {container} = customRender(<Addtofav id={4} title={'city'} image={'/img/image.jpg'}/>, {providerProps: context});
        expect(await screen.getByText('В избранном')).toBeInTheDocument();
        expect(await screen.getByRole('star')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('favorites functional test', async ()=>{
        settingFetchResult([]);
        const spy = jest.spyOn(global, 'fetch');
        customRender(<Addtofav id={4} title={'city'} image={'/img/image.jpg'}/>, {providerProps: context});
        const star = screen.getByText('В избранном');
        await userEvent.click(star);
        expect(spy).toHaveBeenCalled();
    });
});
