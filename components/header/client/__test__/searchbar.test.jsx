import { screen } from "@testing-library/react";
import Searchbar from "../Searchbar";
import customRender from "@/__mocks__/customRender";
import settingFetchResult from "@/__mocks__/fetchMock";
import userEvent from "@testing-library/user-event";

const context = {
    favMenu: false,
    searchMenu: false,
    searchMenuContent: [],
    switchFavMenu: (val)=> context.favMenu = val, 
    switchSearchMenu: (val)=> context.searchMenu = val, 
    setSearchMenuContent: (val)=> context.searchMenuContent = val
};

describe('searchbar testing', ()=>{
    it('searchbar render test', async ()=>{
        customRender(<Searchbar/>, {providerProps: {context}} );

        expect(await screen.findByPlaceholderText('Поиск...')).toBeInTheDocument();
        expect(await screen.findByRole('img')).toBeInTheDocument();

    });
});