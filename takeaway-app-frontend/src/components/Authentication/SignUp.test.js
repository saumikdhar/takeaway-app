import SignUp from './SignUp';
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

  test('should return error message if any fields are empty on submission', () => {
    render(wrapper(<SignUp />));

    const button = screen.getByRole('button', { name: /create account/i });

    userEvent.click(button);

    expect(screen.getByText(/first name is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/surname is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required!/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required!/i)).toBeInTheDocument();
  });

  test('should return error when invalid email is input', () => {
    const onSubmit = jest.fn();

    render(wrapper(<SignUp onSubmit={onSubmit()} />));

    const emailInput = screen.getByRole('textbox', { name: /your email/i });
    userEvent.type(emailInput, 'test');

    const button = screen.getByRole('button', { name: /create account/i });

    userEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
    expect(screen.getByText(/email address is invalid/i)).toBeInTheDocument();
  });

  test('should return error message if any fields exceed max length or fall below min length', () => {
    const onSubmit = jest.fn();

    render(wrapper(<SignUp onSubmit={onSubmit()} />));

    const firstNameInput = screen.getByRole('textbox', { name: /your first name/i });
    const surnameInput = screen.getByRole('textbox', { name: /your surname/i });
    userEvent.type(firstNameInput, 'LA');
    userEvent.type(
      surnameInput,
      'LAisagdfiusfiuhsdiuisdufiusdgfisdghfliugsdfiygsdfoiusgfougsdofgdsuf'
    );

    const button = screen.getByRole('button', { name: /create account/i });

    userEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
    expect(
      screen.getByText(/first name needs to have minimum of 3 characters!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/surname can only have a maximum of 20 characters!/i)
    ).toBeInTheDocument();
  });

  test('should return error message if phone number is invalid', () => {
    const onSubmit = jest.fn();

    render(wrapper(<SignUp onSubmit={onSubmit()} />));

    const phoneNumberInput = screen.getByRole('textbox', { name: /your phone number/i });

    userEvent.type(phoneNumberInput, '984838483p');

    const button = screen.getByRole('button', { name: /create account/i });

    userEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();

    expect(screen.getByText(/phone number is invalid!/i)).toBeInTheDocument();
  });
});
