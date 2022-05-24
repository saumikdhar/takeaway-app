import NavItems from '../../UI/Navigation/NavItems/NavItems';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import store from '../../../store/index';
import { BrowserRouter } from 'react-router-dom';
import { userAuth, authActions } from '../../../store/auth-slice';

describe('Logout', () => {
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
  });

  it('should logout user when user is signed in', () => {
    const payload = { userId: '123', email: 'test@test.com' };
    store.dispatch(userAuth.fulfilled(payload));
    render(wrapper(<NavItems />));
    const NavItemElement = screen.getByText('Logout');
    expect(NavItemElement).toBeInTheDocument;

    store.dispatch(authActions.logout());
    expect(screen.getByText('Login')).toBeInTheDocument;
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
