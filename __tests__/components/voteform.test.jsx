import { screen } from "@testing-library/react";
import customRender from "@/__mocks__/customRender";
import Voteform from "@/components/voteform/client/Voteform";
import userEvent from "@testing-library/user-event";
import settingFetchResult from "@/__mocks__/fetchMock";
const context = {
    voteMenu: ['testcity1','testcity2', 'testcity3'],
    setVoteMenu (val) { context.voteMenu = val},
    setNotification: (val)=>{},
}

describe('test voteform', ()=>{
    it('test render', async ()=>{
        const {container} = customRender(<Voteform/>, {providerProps: context});
        const btns = screen.getAllByRole('button');
        expect(btns.length).toBe(2);
        
        expect(screen.getByText('Проголосуйте за лучшую достопримечательность')).toBeInTheDocument();
        context.voteMenu.forEach(each=>{
            expect(screen.getByText(each)).toBeInTheDocument();
        });

        expect(container).toMatchSnapshot();
    });
    it('functional test', async ()=>{
        settingFetchResult([]);
        const spy = jest.spyOn(global, 'fetch');
        context.voteMenu =['city'];
        customRender(<Voteform/>, {providerProps: context});
        const btns = screen.getAllByRole('button')[1];
        const input = screen.getByRole('radio');

        await userEvent.click(input);
        await userEvent.click(btns);
        
        expect(spy).toHaveBeenCalled();
        expect(screen.getByText('Результаты голосования')).toBeInTheDocument();
    });
});
