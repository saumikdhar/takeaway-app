import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';
import Footer from './components/UI/Navigation/Footer/Footer';
import Authentication from './components/Authentication/Authentication';

// import img from './assets/background.jpg';

const App = props => {
  let routes = (
    <Switch>
      <Route path="/account/login" component={Authentication} />
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
