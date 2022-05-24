import Authentication from './Authentication';
import { Provider } from 'react-redux';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import store from '../../store/index';
import { BrowserRouter } from 'react-router-dom';
import { authActions, userAuth } from '../../store/auth-slice';
import userEvent from '@testing-library/user-event';

describe('Authentication', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = component => (
      <BrowserRouter>
        <Provider store={store}>{component}</Provider>
      </BrowserRouter>
    );
  });

  afterEach(() => {
    store.dispatch(authActions.clearState());
    jest.clearAllMocks();
  });

  it('should authticate a valid user with valid credentials', async () => {
    const onSubmit = jest.fn();

    render(wrapper(<Authentication onSubmit={onSubmit('test@test.com', 'password1')} />));

    const emailInput = screen.getByRole('textbox', { name: /your email/i });
    const passwordInput = screen.getByLabelText(/your password/i);
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'password1');

    expect(loginButton).not.toBeDisabled();

    fireEvent.submit(screen.getByTestId('form'));
    expect(onSubmit).toHaveBeenCalled();

    const payload = { userId: '123', email: 'test@test.com' };
    store.dispatch(userAuth.fulfilled(payload));
    store.dispatch(authActions.logout());
  });

  it('should return error message if password is empty', async () => {
    const onSubmit = jest.fn();

    render(wrapper(<Authentication onSubmit={onSubmit('test@test.com', 'password1')} />));

    const emailInput = screen.getByRole('textbox', { name: /your email/i });
    const passwordInput = screen.getByLabelText(/your password/i);
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '');

    expect(loginButton).not.toBeDisabled();

    fireEvent.submit(screen.getByTestId('form'));
    expect(onSubmit).toHaveBeenCalled();
    userEvent.click(loginButton);

    expect(screen.getByText(/please enter a valid password!/i)).toHaveTextContent(
      'Please enter a valid password!'
    );
  });

  it('should return error message if email is empty', () => {
    const onSubmit = jest.fn();

    render(wrapper(<Authentication onSubmit={onSubmit('test@test.com', 'password1')} />));

    const emailInput = screen.getByRole('textbox', { name: /your email/i });
    const passwordInput = screen.getByLabelText(/your password/i);
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    userEvent.type(emailInput, '');
    userEvent.type(passwordInput, 'password');

    userEvent.click(loginButton);

    expect(screen.getByText(/please enter a valid email address!/i)).toHaveTextContent(
      'Please enter a valid email address!'
    );
  });
});
