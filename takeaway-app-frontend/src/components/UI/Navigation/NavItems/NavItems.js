import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

import { useSelector } from 'react-redux';
import { authSelector } from '../../../../store/auth-slice';

export const NavItems = () => {
  const { isLoggedIn } = useSelector(authSelector);

  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/home">Home</NavItem>
      {!isLoggedIn && <NavItem link="/account/login">Login </NavItem>}
      {isLoggedIn && <NavItem link="/logout">Logout</NavItem>}
    </ul>
  );
};

export default NavItems;
