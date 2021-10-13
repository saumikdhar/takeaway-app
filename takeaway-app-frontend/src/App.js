import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authSelector } from './store/auth-slice';
import { authActions } from './store/auth-slice';
import Home from './components/pages/Home';
import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';
import Footer from './components/UI/Navigation/Footer/Footer';
import Authentication from './components/Authentication/Authentication';
import SignUp from './components/Authentication/SignUp';
import TC from './components/Terms/TermsAndConditions';
import PrivacyPolicy from './components/Terms/PrivacyPolicy';

// import img from './assets/background.jpg';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(authSelector);

  useEffect(() => {
    dispatch(authActions.checkAuthTimeout());
  }, [dispatch]);

  let routes = (
    <Switch>
      <Route path="/account/login" component={Authentication} />
      <Route path="/account/register" component={SignUp} />
      <Route path="/info/terms-and-conditions" component={TC} />
      <Route path="/info/privacy-policy" component={PrivacyPolicy} />
      <Route path="/home" component={Home} />
      <Redirect to="/home" />
    </Switch>
  );

  console.log('isLoggedIn', isLoggedIn);
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/logout" component="" />
        <Redirect to="/home" />
      </Switch>
    );
  }
  return (
    <div
    // style={{
    //   backgroundImage: 'url(' + img + ')',
    //   backgroundPosition: 'center',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat'
    // }}
    >
      <Toolbar />
      {routes}
      <Footer />
    </div>
  );
};

export default withRouter(App);
