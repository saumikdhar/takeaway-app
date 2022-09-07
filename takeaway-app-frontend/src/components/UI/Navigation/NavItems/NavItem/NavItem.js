import classes from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

const NavItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink onClick={props.clicked} to={props.link} exact activeClassName={classes.active}>
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavItem;
