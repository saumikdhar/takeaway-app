import React from 'react';
import classes from './Home.module.css';
import Card from '../UI/Card';
import AboutUs from './AboutUs';
import TypesOfFood from './TypesOfFood';
import Deals from './Deals';

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
      <Deals />
    </>
  );
};

export default Home;
