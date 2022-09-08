import React from 'react';
import classes from './SideDrawer.module.css';
// import Logo from '../../../';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../Backdrop/Backdrop';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../store/auth-slice';

const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  const { email, firstName, surname } = useSelector(authSelector);
  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes['drawer-header-cover']}>
          <div className={classes['drawer-user']}>
            <div className={classes.Logo}>
              {/* <Logo /> */}
              <h1>Exotic Shaad</h1>
            </div>
            <div className={classes['drawer-meta']}>
              <span className={classes['drawer-name']}>
                {firstName} {surname}
              </span>
              <span className={classes['drawer-email']}>{email ? email : 'Please sign in'}</span>
            </div>
          </div>
        </div>
        <nav className={classes.navItems}>
          <NavItems showIcon={props.open} navClicked={props.closed} />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
