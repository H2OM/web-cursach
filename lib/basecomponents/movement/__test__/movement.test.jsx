import Movement from "../movement";
import { render, screen } from "@testing-library/react";


it('movement render test', async ()=>{
    const blocks = ['first', 'second', 'third'];

    const childrens = blocks.map(each=>{
        return <div key={each}>{each}</div>
    });
    const {container} = render(<Movement children={childrens}/>);

    const navs = screen.getAllByRole('navRadio');
    
    expect(navs.length).toBe(3);

    blocks.forEach(each=>{
        expect(screen.getByText(each)).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
    
});