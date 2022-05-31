import Modal from './Modal';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = component => <BrowserRouter>{component}</BrowserRouter>;
  });

  test('should show Modal when component is rendered', () => {
    const handleClose = jest.fn();
    const root = document.createElement('overlays');

    const { getByText } = render(
      <Modal>
        <div>test</div>
        <button onClick={handleClose}>close</button>
      </Modal>
    );
    expect(getByText('test')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /close/i });
    userEvent.click(button);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
