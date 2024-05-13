import userEvent from "@testing-library/user-event";
import Movement from "../movement";
import { render, screen } from "@testing-library/react";

let blocks = ['first', 'second', 'third'];
let childrens = blocks.map(each=>{
    return <div key={each}>{each}</div>
});
describe('movement test', ()=>{
    it('render test', async ()=>{
        const {container} = render(<Movement children={childrens}/>);
        const navs = screen.getAllByRole('navRadio');
        
        expect(navs.length).toBe(3);
        blocks.forEach(each=>{
            expect(screen.getByText(each)).toBeInTheDocument();
        });
        expect(container).toMatchSnapshot();
    });
    it('functional test one dot for one block', async ()=>{
        render(<Movement children={childrens}/>);
        const nav = screen.getAllByRole('navRadio')[1];
        const wrap = screen.getByRole('wrap');

        await userEvent.click(nav);

        expect(nav.className.includes('Movement__nav__point_select')).toBeTruthy();
        expect(wrap.style.transform).toBe('translateX(-100%)');
    });
    it('functional test one for three blocks', async ()=>{
        blocks = ['first', 'second', 'third', 'five', 'six', 'seven', 'eight'];
        childrens = blocks.map(each=>{
            return <div key={each}>{each}</div>
        });
        render(<Movement children={childrens} blocks/>);
        const nav = screen.getAllByRole('navRadio')[1];
        const wrap = screen.getByRole('wrap');
        await userEvent.click(nav);

        expect(nav.className.includes('Movement__nav__point_select')).toBeTruthy();
        expect(wrap.style.transform).toBe('translateX(calc(-100% - 80px))');
    });
});