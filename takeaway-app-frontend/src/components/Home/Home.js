import React from 'react';
import classes from './Home.module.css';
import Card from '../UI/Card';
import tikkaMasalaImg from '../../assets/chicken-tikka-masala.jpg';
import AboutUs from './AboutUs';
import TypesOfFood from './TypesOfFood';

const Home = () => {
  return (
    <>
      <div className={classes.cardContainer}>
        <div className={classes.card2}>
          <div className={classes.card3}>
            <Card>
              <div className={classes.uppercase}>
                <span>Contact-free delivery</span>
              </div>
              <div>
                <span>
                  All our deliveries are contact free to keep everyone healthy. All orders above £50
                  will need to be paid online by debit/credit card
                </span>
              </div>
              <div className={classes.button}>
                <button>Order now</button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <AboutUs />
      <TypesOfFood />

      <section id={classes['popular-dishes-container']}>
        <h2 className={classes['typography-2']}>
          <span>Our Popular dishes</span>
        </h2>
        <div className={classes['dish-container']}>
          <div className={classes['margin-10']}>
            <img src={tikkaMasalaImg} alt="Chicken Tikka masala" />
          </div>
          <div className={classes['margin-10']}>
            <img src={tikkaMasalaImg} alt="Chicken Tikka masala" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
