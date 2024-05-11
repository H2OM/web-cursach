import customRender from "@/__mocks__/customRender";
import Favmenu from "../favmenu";
import { screen } from "@testing-library/react";

const context = {
    favorites: {
        3: ["Озеро Сукко", "Ozero Sukko", "catalog/kiparis_ozero.webp"],
        5: ["test2", "test2", "catalog/test2.webp"],
    },
    setFavorites (data) {
        this.favorites = data;
    },
    favMenu: true
    
};

it('favmenu render', async ()=>{
    const {container} = customRender(<Favmenu/>, {providerProps: context});
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(2);

    expect(container).toMatchSnapshot();

});