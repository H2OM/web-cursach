import settingFetchResult from "@/__mocks__/fetchMock";
import 'intersection-observer';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import customRender from "@/__mocks__/customRender";
import { screen } from "@testing-library/react";
import Details from "@/components/details/server/Details";

jest.mock('next/navigation');
useRouter.mockReturnValue({
    push: jest.fn(),
}); 
usePathname.mockReturnValue("localhost");
useSearchParams.mockReturnValue({});

it('details test',async ()=>{
    const data = {
        article: 'OZERO',
        image: '/img/image1.jpg',
        title: 'ozero',
        id: 3,
        text: 'sometext',
        rating: 5,
        voices: 3
    };
    settingFetchResult(data);

    const {container} = customRender(await Details({params: {details: "OZERO"}}), {providerProps: {favorites: [3,4]}});

    expect(await screen.findByText('ozero')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(await screen.getByText('sometext')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
});


