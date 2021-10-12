import classes from './AboutUs.module.css';
import spoonOfSpicesImg from '../../assets/spoon-of-spices.jfif';

const RESTAURANT_DESCRIPTION =
  "Exotic Shaad is fast becoming the chosen favourite amongst 'curry' lovers. Our five star master chef is dedicated to bringing our wide range of patrons the most authentic Indian cuisine. Our menu is a culinary delight, where east meets west - Indian recipes passed down from generation to generation and fused with modern European techniques in a contemporary style. At Exotic Shaad, our customers enhancing their enjoyment and enriching their knowledge of Indian cuisine. We hope that you will enjoy our selection of dishes, and order from Exotic Shaad will be a memorable one, so come and experience Indian Cuisine at it best. With staff trained to ensure you have the most enjoyable dining experience possible, we guarantee you will return time, and time again.";

const AboutUs = () => {
  return (
    <section id={classes.about}>
      <div className={classes['about-wrapper']}>
        <div className={classes['about-text']}>
          <p className={classes.small}>About Us</p>
          <h2>Our chef has over 20 years of experience in this cusine</h2>
          <p>{RESTAURANT_DESCRIPTION}</p>
        </div>
        <div className={classes['about-img']}>
          <img src={spoonOfSpicesImg} alt="food" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
