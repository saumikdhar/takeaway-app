import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';
import homeIcon from '../../../../assets/icons/home.png';
import loginIcon from '../../../../assets/icons/user.png';

import { useSelector } from 'react-redux';
import { authSelector } from '../../../../store/auth-slice';

export const NavItems = props => {
  const { isLoggedIn } = useSelector(authSelector);

  return (
    <ul className={classes.NavigationItems}>
      <NavItem clicked={props.navClicked} link="/home">
        <img src={homeIcon} alt="home" className={classes.Icon} />
        Home
      </NavItem>
      {!isLoggedIn && (
        <NavItem clicked={props.navClicked} link="/account/login">
          <img src={loginIcon} alt="login" className={classes.Icon} />
          Login{' '}
        </NavItem>
      )}
      {isLoggedIn && (
        <NavItem clicked={props.navClicked} link="/logout">
          Logout
        </NavItem>
      )}
    </ul>
  );
};

export default NavItems;
