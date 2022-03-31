import { Redirect } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { useEffect } from 'react';
import { baseUrl } from '../../shared/utility';
import classes from './Verification.module.css';
import Card from '../UI/Card';
import { useParams } from 'react-router-dom';
import GreenTick from '../UI/GreenTick/GreenTick';

const Verification = props => {
  const { token } = useParams();
  const { sendRequest, error, fetchedData } = useHttp();

  useEffect(() => {
    if (token === ':token' || token === ':') {
      return <Redirect to="/home" />;
    }

    // if (token.length < 32 || token.length > 32) {
    //   return <Redirect to="/home" />;
    // }
    if (token) {
      sendRequest({ url: `${baseUrl}/account/verification/${token}`, method: 'POST' });
    }
  }, [sendRequest, token]);

  return (
    <>
      <section className={classes.verification}>
        <Card>
          <p>
            {fetchedData && <GreenTick /> && fetchedData.message}
            {error && error}
          </p>
        </Card>
      </section>
    </>
  );
};

export default Verification;
