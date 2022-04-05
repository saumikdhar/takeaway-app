import classes from './RedCross.module.css';

const RedCross = () => {
  return (
    <>
      <div className={classes['main-container']}>
        <div className={classes['check-container']}>
          <div className={classes['check-background']}>
            <svg viewBox="0 0 51 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 16 36 36 M36 16 16 36"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={classes['check-shadow']}></div>
        </div>
      </div>
    </>
  );
};

export default RedCross;
