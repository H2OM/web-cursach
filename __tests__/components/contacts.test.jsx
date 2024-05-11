import Contacts from '@/components/contacts/server/Contacts';
import 'intersection-observer';
import customRender from '@/__mocks__/customRender';
import { screen } from '@testing-library/react';



it('contacts snapshot', async () => {
  const {container} = customRender(<Contacts/>, {});
  const images = screen.getAllByRole('img');
  const titles = screen.getAllByRole('heading');
  
  expect(titles.length).toBe(4);
  expect(images.length).toBe(2);
  expect(container).toMatchSnapshot();
});