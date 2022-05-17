import Button from './Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  test("should show button it's name when component is rendered", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument;
    expect(screen.getByRole('button')).toBeInTheDocument;
  });
});
