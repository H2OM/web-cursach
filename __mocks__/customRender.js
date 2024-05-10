import ClientContext from '@/lib/context/ClientContext';
import { render } from '@testing-library/react';

export default customRender = (ui, {providerProps}) => {
    return render(
      <ClientContext.Provider value={{...providerProps}}>{ui}</ClientContext.Provider>,
    )
}