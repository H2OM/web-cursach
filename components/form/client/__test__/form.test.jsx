import { render, screen } from "@testing-library/react";
import ClientForm from "../ClientForm";
import customRender from "@/__mocks__/customRender";
import userEvent from "@testing-library/user-event";
import settingFetchResult from "@/__mocks__/fetchMock";
const notifications = {
    setNotification: ()=>{},
    notification: {
        status: false,
        message: ""
    }
}

describe('test form', ()=>{
    settingFetchResult({message:"done"});
    
    it('test render', async ()=>{
        const {container} = customRender(<ClientForm/>, {providerProps: notifications});
        const errors = screen.getAllByRole('error');
        const inputs = screen.getAllByPlaceholderText(/(Ваше имя){1}|(Ваша почта){1}|(Какой у вас вопрос?){1}|(Номер телефона){1}/);
       
        expect(errors.length).toBe(3);
        expect(inputs.length).toBe(4);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    
        expect(container).toMatchSnapshot();
    
    });
    it('functional test - success way',async ()=>{
        customRender(<ClientForm/>, {providerProps: notifications});
        const name = screen.getByPlaceholderText('Ваше имя');
        const mail = screen.getByPlaceholderText('Ваша почта');
        const number = screen.getByPlaceholderText('Номер телефона');
        const text = screen.getByPlaceholderText('Какой у вас вопрос?');
        const submit = screen.getByRole('button');
        const checkbox = screen.getByRole('checkbox');

        await userEvent.type(name, 'Имя');
        await userEvent.type(mail, 'example@mail.ru');
        await userEvent.type(text, "some question");
        await userEvent.type(number, "79182195584");

        expect(name).toHaveValue("Имя");
        expect(number).toHaveValue("+7 (918) 219-55-84");

        await userEvent.click(checkbox);
        await userEvent.click(submit);
        
        expect(name).toHaveValue("");
        expect(number).toHaveValue("");
    });
    it('functional test - rejected due to checkbox',async ()=>{
        customRender(<ClientForm/>, {providerProps: notifications});
        const name = screen.getByPlaceholderText('Ваше имя');
        const mail = screen.getByPlaceholderText('Ваша почта');
        const text = screen.getByPlaceholderText('Какой у вас вопрос?');
        const submit = screen.getByRole('button');

        await userEvent.type(name, 'Имя');
        await userEvent.type(mail, 'example@mail.ru');
        await userEvent.type(text, "some question");

        await userEvent.click(submit);
        
        expect(name).toHaveValue("Имя");
    });
    it('functional test - rejected due to wrong mail',async ()=>{
        
        customRender(<ClientForm/>, {providerProps: notifications});
        const name = screen.getByPlaceholderText('Ваше имя');
        const mail = screen.getByPlaceholderText('Ваша почта');
        const text = screen.getByPlaceholderText('Какой у вас вопрос?');
        const submit = screen.getByRole('button');
        const mailerror = screen.getAllByRole('error')[1];
        const checkbox = screen.getByRole('checkbox');
        
        await userEvent.type(name, 'Имя');
        await userEvent.type(mail, 'example@mailru');
        await userEvent.type(text, "some question");

        await userEvent.click(checkbox);
        await userEvent.click(submit);
        expect(mail).toHaveValue("example@mailru");
        expect(mailerror.className.includes('Form__form__input__error_show')).toBeTruthy();

        await userEvent.clear(mail);
        await userEvent.type(mail, 'example@mail.ru');
        expect(mailerror.className.includes('Form__form__input__error_show')).toBeFalsy();

        await userEvent.click(submit);
        expect(mail).toHaveValue("");
        
    });
    it('functional test - test wrong name',async ()=>{
        customRender(<ClientForm/>, {providerProps: notifications});
        const name = screen.getByPlaceholderText('Ваше имя');

        await userEvent.type(name, 'Имя4223');
        expect(name).toHaveValue("Имя");
        
    });
    
});
