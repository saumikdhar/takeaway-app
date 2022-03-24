import classes from './VerificationConfirmation.module.css';
import Card from '../UI/Card';

const VerificationConfirmation = () => {
  return (
    <>
      <div className={classes.verification}>
        <Card>
          <h1>Your Account has now been verified</h1>
        </Card>
      </div>
    </>
  );
};

export default VerificationConfirmation;
