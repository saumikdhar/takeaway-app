import Modal from './Modal';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  afterEach(cleanup);

  test('should show Modal when component is rendered', () => {
    const handleClose = jest.fn();

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

  test('should hide Modal when backdrop is clicked', () => {
    const handleClose = jest.fn();

    const { getByText } = render(
      <Modal onClose={handleClose}>
        <div>test</div>
      </Modal>
    );
    expect(getByText('test')).toBeInTheDocument();

    const modalOverlay = document.querySelector('#overlays > div:nth-child(1)');

    userEvent.click(modalOverlay);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
