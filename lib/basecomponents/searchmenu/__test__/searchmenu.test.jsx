import customRender from "@/__mocks__/customRender";
import SearchMenu from "../searchmenu";
import { screen } from "@testing-library/react";

const context = {
    searchMenu: true,
    searchMenuContent: [
        {
            title: "test1",
            article: "test1article",
            image: "/img/image.jpg"
        },
        {
            title: "test2",
            article: "test2article",
            image: "/img/image.jpg"
        },
        {
            title: "test3",
            article: "test3article",
            image: "/img/image.jpg"
        },
        {
            title: "test4",
            article: "test4article",
            image: "/img/image.jpg"
        },
    ]
}

it('searchmenu render test', async ()=>{
    const {container} = customRender(<SearchMenu/>, {providerProps: context});
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(context.searchMenuContent.length);
    context.searchMenuContent.forEach(each=>{
        expect(screen.getByText(each.title)).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
});