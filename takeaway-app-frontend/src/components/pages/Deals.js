import { useEffect } from 'react';

import classes from './Deals.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Deals = () => {
  useEffect(() => {
    Aos.init({ duration: 3000, once: true });
  }, []);

  return (
    <section data-aos="fade-up" id={classes['popular-dishes-container']}>
      <h2 className={classes['typography-2']}>
        <span>Our Meal Deals</span>
      </h2>
      <div className={classes['dish-container']}>
        <span className={classes.deal}>Distintive delight 1 person</span>
        <span className={classes.deal}>Distintive delight 2 person</span>
      </div>
    </section>
  );
};

export default Deals;
