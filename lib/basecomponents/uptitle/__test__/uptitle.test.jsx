import { render, screen } from "@testing-library/react";
import Uptitle from "../uptitle";
import 'intersection-observer';

test('title render', ()=>{
    render(<Uptitle children={<h1>Title</h1>}/>);
    expect(screen.getByText('Title')).toBeInTheDocument();
});