import 'intersection-observer';
import customRender from '@/__mocks__/customRender';
import Header from '@/components/header/server/Header';
import { screen } from '@testing-library/react';



it('header render test', async () => {
    const {container} = customRender(<Header/>, {providerProps: {favorites: [4,3]}});
    const links = screen.getAllByRole('link');
    const images = screen.getAllByRole('img');
    
    expect(links.length).toBe(4);
    expect(images.length).toBe(3);


    expect(container).toMatchSnapshot();
});