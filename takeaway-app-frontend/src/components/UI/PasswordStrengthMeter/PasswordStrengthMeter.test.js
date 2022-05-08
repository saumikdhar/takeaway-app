import PasswordStrengthMeter from './PasswordStrengthMeter';
import { render, screen } from '@testing-library/react';

describe('PasswordStrengthMeter', () => {
  test('should show 0 value - weak if password is weak', () => {
    render(<PasswordStrengthMeter password={'password'} />);

    const passwordStrengthMeterElement = screen.getByRole('progressbar');
    expect(passwordStrengthMeterElement).toHaveValue(0);
    expect(screen.getByText('Weak')).toBeInTheDocument;
  });

  test('should show 1 value - weak if password is weak', () => {
    render(<PasswordStrengthMeter password={'password12'} />);

    const passwordStrengthMeterElement = screen.getByRole('progressbar');
    expect(passwordStrengthMeterElement).toHaveValue(1);
    expect(screen.getByText('Weak')).toBeInTheDocument;
  });

  test('should show 2 value - fair if password is fair', () => {
    render(<PasswordStrengthMeter password={'xs5x8sf'} />);

    const passwordStrengthMeterElement = screen.getByRole('progressbar');
    expect(passwordStrengthMeterElement).toHaveValue(2);
    expect(screen.getByText('Fair')).toBeInTheDocument;
  });

  test('should show 3 value - good if password is good', () => {
    render(<PasswordStrengthMeter password={'9PNvUFVN4'} />);

    const passwordStrengthMeterElement = screen.getByRole('progressbar');
    expect(passwordStrengthMeterElement).toHaveValue(3);
    expect(screen.getByText('Good')).toBeInTheDocument;
  });

  test('should show 4 value - strong if password is strong', () => {
    render(<PasswordStrengthMeter password={'u2PYF#6eK?4}?`FG'} />);

    const passwordStrengthMeterElement = screen.getByRole('progressbar');
    expect(passwordStrengthMeterElement).toHaveValue(4);
    expect(screen.getByText('Strong')).toBeInTheDocument;
  });
});
