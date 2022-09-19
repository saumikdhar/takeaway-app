import classes from './Toolbar.module.css';
import NavItems from '../NavItems/NavItems';
import mealsImage from '../../../../assets/meals.jpg';
<<<<<<< HEAD
import DrawerToggle from '../Sidebar/DrawerToggle/DrawerToggle';
=======
import restaurantLogo from '../../../../assets/exotic_shaad_logo.png';
>>>>>>> 7f7a882db023a89dc1bd0e2f3c7f1396608df5cf

const Toolbar = props => {
  return (
    <>
      <header className={classes.Toolbar}>
        <header className={classes.header}>
          <DrawerToggle clicked={props.drawerToggleClicked} />
          <div className={classes.header2}>
            <h1>Exotic Shaad</h1>
            {/* <img src={restaurantLogo} alt="logo of exotic shaad" /> */}
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
