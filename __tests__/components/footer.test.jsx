import 'intersection-observer';
import customRender from '@/__mocks__/customRender';
import Footer from '@/components/footer/server/Footer';
import { screen } from '@testing-library/react';

it('footer snapshot', async () => {
    const {container} = customRender(<Footer/>, {});
    const images = screen.getAllByRole('img');
    const titles = screen.getAllByRole('heading');
    const info = screen.getAllByRole('info');
    expect(images.length).toBe(3);
    expect(titles.length).toBe(2);
    expect(info.length).toBe(3);
    expect(await screen.findByRole('link')).toBeInTheDocument();
    expect(await screen.getByText('Подписаться')).toBeInTheDocument();
    expect(await screen.getByPlaceholderText('Ваша почта')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
});