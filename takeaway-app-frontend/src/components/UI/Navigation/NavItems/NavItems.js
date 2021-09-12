import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

export const NavItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/home">Home </NavItem>
      <NavItem link="/auth">Login </NavItem>
    </ul>
  );
};

export default NavItems;
