import classes from './Toolbar.module.css';
import NavItems from '../NavItems/NavItems';
import mealsImage from '../../../../assets/meals.jpg';
import DrawerToggle from '../Sidebar/DrawerToggle/DrawerToggle';

const Toolbar = props => {
  return (
    <>
      <header className={classes.Toolbar}>
        <header className={classes.header}>
          <DrawerToggle clicked={props.drawerToggleClicked} />
          <div className={classes.header2}>
            <h1>Exotic Shaad</h1>
          </div>
          <nav className={classes.DesktopOnly}>
            <NavItems />
          </nav>
        </header>
        <div className={classes['main-image']}>
          <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
      </header>
    </>
  );
};

export default Toolbar;
