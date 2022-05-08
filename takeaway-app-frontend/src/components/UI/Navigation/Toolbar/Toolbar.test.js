import Toolbar from './Toolbar';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import store from '../../../../store/index';
import { BrowserRouter } from 'react-router-dom';

describe('Toolbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = component => (
      <BrowserRouter>
        <Provider store={store}>{component}</Provider>
      </BrowserRouter>
    );
  });

  test('should show navbar when component is rendered', () => {
    render(wrapper(<Toolbar />));
    const ToolbarElement = screen.getByRole('navigation');

    expect(ToolbarElement).toBeInTheDocument;
  });
});
