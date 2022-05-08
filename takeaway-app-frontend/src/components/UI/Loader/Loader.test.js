import Loader from './Loader';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
  test('should show loading when component is rendered', () => {
    render(<Loader />);
    expect(screen.getByText('Loading')).toBeInTheDocument;
  });
});
