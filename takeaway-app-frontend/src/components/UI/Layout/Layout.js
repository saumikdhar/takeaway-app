import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidebar/SideDrawer';
import { useState } from 'react';

const Layout = props => {
  const [sideDrawer, setSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setSideDrawer(prevState => !prevState);
  };

  const sideDrawerCloseHandler = () => {
    setSideDrawer(false);
  };

  return (
    <>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={sideDrawer} closed={sideDrawerCloseHandler} />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
