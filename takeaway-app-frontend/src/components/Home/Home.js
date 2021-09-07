import React from 'react';
import classes from './Home.module.css';
import Card from '../UI/Card';
import tikkaMasalaImg from '../../assets/chicken-tikka-masala.jpg';

const RESTAURANT_DESCRIPTION =
  "Exotic Shaad is fast becoming the chosen favourite amongst 'curry' lovers. Our five star master chefs are dedicated to bringing our wide range of patrons the most authentic Indian cuisine. Our menu is a culinary delight, where east meets west - Indian recipes passed down from generation to generation and fused with modern European techniques in a contemporary style. At Exotic Shaad, our customers enhancing their enjoyment and enriching their knowledge of Indian cuisine. We hope that you will enjoy our selection of dishes, and order from Exotic Shaad will be a memorable one. So come and experience Indian Cuisine at it best. With staff trained to ensure you have the most enjoyable dining experience possible, we guarantee you will return time, and time again.";

const Home = () => {
  return (
    <div>
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
      <div className={classes.home}>
        <section className={classes.main}>
          <h1 className={classes.title}> Exotic Shaad </h1>
          <p className={classes.description}>{RESTAURANT_DESCRIPTION}</p>
        </section>
      </div>
      <div className={classes['popular-dishes-container']}>
        <h2 className={classes['typography-2']}>
          <span>Popular dishes</span>
        </h2>
        <div className={classes['dish-container']}>
          <div className={classes['margin-10']}>
            <img src={tikkaMasalaImg} alt="Chicken Tikka masala" />
          </div>
          <div className={classes['margin-10']}>
            <img src={tikkaMasalaImg} alt="Chicken Tikka masala" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
