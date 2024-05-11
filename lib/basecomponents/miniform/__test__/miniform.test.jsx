import { screen } from "@testing-library/react";
import customRender from "@/__mocks__/customRender";
import userEvent from "@testing-library/user-event";
import settingFetchResult from "@/__mocks__/fetchMock";
import Miniform from "../miniform";
afterEach(() => {    
    jest.clearAllMocks();
  });

describe('test miniform', ()=>{
    
    it('test render', async ()=>{
        const {container} = customRender(<Miniform/>, {providerProps: {setNotification() {}}});

        expect(await screen.getByRole('button')).toBeInTheDocument();
        expect(await screen.getByPlaceholderText('Ваша почта')).toBeInTheDocument();
        expect(await screen.getByText('Неверный формат почты')).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });
    
    it('functional test success way', async ()=>{
        settingFetchResult({message: "success"});
        const spy = jest.spyOn(global, 'fetch');
        customRender(<Miniform/>, {providerProps: {setNotification() {}}});
        const input = screen.getByPlaceholderText('Ваша почта');
        const submit = screen.getByRole('button');

        await userEvent.type(input, 'someemail@gmail.ru');
        await userEvent.click(submit);

        expect(spy).toHaveBeenCalled();
        expect(input).toHaveValue("");
    });
    it('functional test exeption', async ()=>{
        const spy = jest.spyOn(global, 'fetch');
        customRender(<Miniform/>, {providerProps: {setNotification() {}}});
        const input = screen.getByPlaceholderText('Ваша почта');
        const submit = screen.getByRole('button');

        await userEvent.type(input, 'someemail@gmailru');
        await userEvent.click(submit);

        expect(spy).not.toHaveBeenCalled();
        expect(input).toHaveValue("someemail@gmailru");
    });
});
