import classes from './Deals.module.css';

const Deals = () => {
  return (
    <section id={classes['popular-dishes-container']}>
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
