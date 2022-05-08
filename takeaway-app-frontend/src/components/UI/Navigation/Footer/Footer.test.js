import Footer from './Footer';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import store from '../../../../store/index';
import { BrowserRouter } from 'react-router-dom';

describe('Footer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = component => (
      <BrowserRouter>
        <Provider store={store}>{component}</Provider>
      </BrowserRouter>
    );
  });

  test('should show footer when component is rendered', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('#root > div > div:nth-child(6) > div')).toBeInTheDocument;
  });

  test('should show text in footer when footer is rendered', () => {
    render(wrapper(<Footer />));
    const FooterElement = screen.getAllByText('© 2018-2021 Exotic Shaad');

    expect(FooterElement).toBeInTheDocument;
  });
});
