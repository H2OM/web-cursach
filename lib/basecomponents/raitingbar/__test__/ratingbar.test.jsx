import { render, screen } from "@testing-library/react";
import Ratingbar from "../ratingbar";
import { useRouter } from 'next/navigation';
import settingFetchResult from "@/__mocks__/fetchMock";
import userEvent from "@testing-library/user-event";
jest.mock('next/navigation');
useRouter.mockReturnValue({
    push: jest.fn(),
    refresh: jest.fn()
}); 

describe('test ratingbar', ()=>{

    it('render test', async ()=>{
        const {container} = render(<Ratingbar rating={4} voices={6} userrating={5} id={'city'} id2={'image.jpg'}/>);
        const stars = screen.getAllByRole('svg');
        expect(stars.length).toBe(5);
        expect(await screen.getByText('Ваша оценка 5')).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });
    it('functional test', async ()=>{
        settingFetchResult([]);
        const spy = jest.spyOn(global, 'fetch');
        render(<Ratingbar rating={4} voices={6} userrating={5} id={'city'} id2={'image.jpg'}/>);
        
        const star = screen.getAllByRole('svg')[3];

        await userEvent.click(star);
        
        expect(spy).toHaveBeenCalled();
    });
});