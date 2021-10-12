import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/pages/Home';
import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';
import Footer from './components/UI/Navigation/Footer/Footer';
import Authentication from './components/Authentication/Authentication';
import SignUp from './components/Authentication/SignUp';
import TC from './components/Terms/TermsAndConditions';
import PrivacyPolicy from './components/Terms/PrivacyPolicy';

// import img from './assets/background.jpg';

const App = props => {
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

  if (props.isAuthorised) {
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
