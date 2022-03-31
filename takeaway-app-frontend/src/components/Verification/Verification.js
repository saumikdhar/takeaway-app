import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { useEffect } from 'react';
import { baseUrl } from '../../shared/utility';
import classes from './Verification.module.css';
import Card from '../UI/Card';
import { useParams } from 'react-router-dom';
import GreenTick from '../UI/GreenTick/GreenTick';
import Button from '../UI/Button/Button';

const Verification = props => {
  const { token } = useParams();
  const { sendRequest, error, fetchedData } = useHttp();
  const history = useHistory();
  const location = props.location.pathname.split('/').pop();

  useEffect(() => {
    if (location === ':token' || location === ':') {
      return history.push('/home');
    }

    if (token.length < 32 || token.length > 32) {
      return history.push('/home');
    }
    if (token) {
      sendRequest({ url: `${baseUrl}/account/verification/${token}`, method: 'POST' });
    }
  }, [sendRequest, token, location, history]);

  return (
    <>
      <section className={classes.verification}>
        <Card>
          <>
            {fetchedData && (
              <div className={classes.card}>
                <GreenTick /> <div className={classes.title}>Email Verified</div>
                <p>{fetchedData.message} </p>
              </div>
            )}
            {error && (
              <div className={classes.card}>
                <div className={classes.title}>Email Verification failed</div>
                <p>{error}</p>
                <div className={classes.actions}>
                  <div className={classes.button}>
                    <Button>Send a new link</Button>
                  </div>
                </div>
              </div>
            )}
          </>
        </Card>
      </section>
    </>
  );
};

export default Verification;
