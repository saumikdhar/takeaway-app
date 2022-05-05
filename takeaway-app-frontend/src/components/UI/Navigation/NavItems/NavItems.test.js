import React from 'react';
import NavItems from './NavItems';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import store from '../../../../store/index';
import { BrowserRouter } from 'react-router-dom';
import { userAuth, authActions } from '../../../../store/auth-slice';

describe('NavItems', () => {
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

  test('should show two NavItem element if user is not Authorised', () => {
    render(wrapper(<NavItems />));
    const NavItemElement = screen.getAllByRole('link');

    expect(NavItemElement).toHaveLength(2);
  });

  it('should show two NavItem element if user is Authorised', () => {
    const payload = { userId: '123', email: 'test@test.com' };
    store.dispatch(userAuth.fulfilled(payload));
    render(wrapper(<NavItems />));
    const NavItemElement = screen.getAllByRole('link');

    expect(NavItemElement).toHaveLength(2);
  });

  it('should show logout NavItem element if user is Authorised', () => {
    const payload = { userId: '123', email: 'test@test.com' };
    store.dispatch(userAuth.fulfilled(payload));
    render(wrapper(<NavItems />));
    const NavItemElement = screen.getByText('Logout');

    expect(NavItemElement).toBeInTheDocument;
  });
});
