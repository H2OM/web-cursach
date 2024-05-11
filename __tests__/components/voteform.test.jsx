import { render, screen } from "@testing-library/react";
import customRender from "@/__mocks__/customRender";
import userEvent from "@testing-library/user-event";
import settingFetchResult from "@/__mocks__/fetchMock";
import Voteform from "@/components/voteform/client/Voteform";
import ClientContext from "@/lib/context/ClientContext";
const context = {
    voteMenu: ['testcity1','testcity2', 'testcity3'],
    setVoteMenu (val) { this.voteMenu = val},
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
});
