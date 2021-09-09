import classes from './TypesOfFood.module.css';
import baltiImg from '../../assets/balti.jpg';
import herbsAndSpicesImg from '../../assets/herbs-and-spices.jpg';
import southernDishesImg from '../../assets/banana-leaf-southern-dishes.jpg';
import Modal from '../UI/Modal';

const TypesOfFood = () => {
  return (
    <section id={classes.food}>
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
              <a href="#" className={classes['btn']} target="blank">
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className={classes['food-type']}>
          <div className={classes['img-container']}>
            <img src={herbsAndSpicesImg} alt="Spices" />
            <div className={classes['img-content']}>
              <h3>Spices</h3>
              <a href="#" className={classes['btn']} target="blank">
                Learn more
              </a>
            </div>
          </div>
        </div>
        <div className={classes['food-type']}>
          <div className={classes['img-container']}>
            <img src={southernDishesImg} alt="error" />
            <div className={classes['img-content']}>
              <h3>Southern Dishes</h3>
              <a href="#" className={classes['btn']} target="blank">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypesOfFood;
