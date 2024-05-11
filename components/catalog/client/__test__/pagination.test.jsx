import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { render, screen } from "@testing-library/react";
import Pagination from '../Pagination';
jest.mock('next/navigation');
useRouter.mockReturnValue({
    push: jest.fn(),
}); 
usePathname.mockReturnValue("localhost");
useSearchParams.mockReturnValue({});

const urlparams = new URLSearchParams();
global.URLSearchParams = jest.fn(x => (urlparams));


describe('pagination test', ()=>{
    it('render test start', ()=>{
        const {container} = render(<Pagination page={1} max={40}/>);
        const dots = screen.getAllByText('...');

        expect(dots.length).toBe(1);
        expect(screen.getByText(1)).toBeInTheDocument();
        
        Array.from({length: 5}).forEach((_,i)=>{
            expect(screen.getByText(1+i+1)).toBeInTheDocument();
        });

        expect(screen.getByText(40)).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });
    it('render test middle', ()=>{
        const {container} = render(<Pagination page={8} max={40}/>);
        const dots = screen.getAllByText('...');


        expect(screen.getByText('1')).toBeInTheDocument();
        expect(dots.length).toBe(2);
        expect(screen.getByText(8)).toBeInTheDocument();
        expect(screen.getByText(8-1)).toBeInTheDocument();
        expect(screen.getByText(8-2)).toBeInTheDocument();
        
        Array.from({length: 5}).forEach((_,i)=>{
            expect(screen.getByText(8+i+1)).toBeInTheDocument();
        });
        expect(screen.getByText(40)).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });
    it('render test end', ()=>{
        const {container} = render(<Pagination page={40} max={40}/>);
        const dots = screen.getAllByText('...');

        expect(dots.length).toBe(1);
        expect(screen.getByText(1)).toBeInTheDocument();
                
        Array.from({length: 6}).forEach((_,i)=>{
            expect(screen.getByText(40-6+i)).toBeInTheDocument();
        });

        expect(screen.getByText(40)).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });
});