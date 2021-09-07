import { Fragment } from 'react';

import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = props => {
  return (
    <Fragment>
      <div className={classes.header2}>
        <header className={classes.header}>
          <h1 className={classes.le}>Exotic Shaad</h1>
        </header>
        <div className={classes['main-image']}>
          <img src={mealsImage} alt="A table full of delicious food!" />
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
