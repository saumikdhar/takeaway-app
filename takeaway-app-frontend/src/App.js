import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authSelector, checkAuthState } from './store/auth-slice';
import Home from './components/pages/Home';
import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';
import Footer from './components/UI/Navigation/Footer/Footer';
import Authentication from './components/Authentication/Authentication';
import SignUp from './components/Authentication/SignUp';
import TC from './components/Terms/TermsAndConditions';
import PrivacyPolicy from './components/Terms/PrivacyPolicy';
import Logout from './components/Authentication/Logout/Logout';

// import img from './assets/background.jpg';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(authSelector);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(checkAuthState());
    }
  }, [dispatch, token]);

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

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/home" component={Home} />
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
