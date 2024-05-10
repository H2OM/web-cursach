import Contacts from '@/components/contacts/server/Contacts';
import 'intersection-observer';
import customRender from '@/__mocks__/customRender';



it('contacts snapshot', async () => {
  const {container} = customRender(<Contacts/>, {});
  expect(container).toMatchSnapshot();
});