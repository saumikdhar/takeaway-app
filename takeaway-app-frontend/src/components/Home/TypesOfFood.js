import { useState, useEffect } from 'react';

import classes from './TypesOfFood.module.css';
import baltiImg from '../../assets/balti.jpg';
import herbsAndSpicesImg from '../../assets/herbs-and-spices.jpg';
import southernDishesImg from '../../assets/banana-leaf-southern-dishes.jpg';
import Modal from '../UI/Modal';
import Aos from 'aos';
import 'aos/dist/aos.css';

const TypesOfFood = () => {
  const [moreInfoIsShown, setMoreInfoIsShown] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 3000 });
  }, []);

  const showMoreInfoHandler = () => {
    setMoreInfoIsShown(true);
    document.body.style.overflow = 'hidden';
  };

  const hideMoreInfoHandler = () => {
    setMoreInfoIsShown(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id={classes.food} data-aos="fade-up">
      <h2>Types of food</h2>
      <div className={classes.small}>
        For mobile users tap and hold on image below to learn more
      </div>
      <div className={classes['food-container']}>
        <div className={classes['food-type']}>
          <div className={classes['img-container']}>
            <img src={baltiImg} alt="Balti" />
            <div className={classes['img-content']}>
              <h3>Balti</h3>
              <button onClick={showMoreInfoHandler} className={classes['btn']}>
                Learn more
              </button>
            </div>
          </div>
        </div>
        <div className={classes['food-type']}>
          <div className={classes['img-container']}>
            <img src={herbsAndSpicesImg} alt="Spices" />
            <div className={classes['img-content']}>
              <h3>Spices</h3>
              <button onClick={showMoreInfoHandler} className={classes['btn']}>
                Learn more
              </button>
            </div>
          </div>
        </div>
        {moreInfoIsShown && (
          <Modal onClose={hideMoreInfoHandler}>
            <div className={classes.actions}>
              <h1>Southern Indian Dishes</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <button className={classes['button']} onClick={hideMoreInfoHandler}>
                Close
              </button>
            </div>{' '}
          </Modal>
        )}
        <div className={classes['food-type']}>
          <div className={classes['img-container']}>
            <img src={southernDishesImg} alt="error" />
            <div className={classes['img-content']}>
              <h3>Southern Dishes</h3>
              <button onClick={showMoreInfoHandler} className={classes['btn']}>
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypesOfFood;
