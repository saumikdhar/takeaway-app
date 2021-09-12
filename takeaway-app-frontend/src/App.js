import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';
import Footer from './components/UI/Navigation/Footer/Footer';

const App = props => {
  let routes = (
    <Switch>
      <Route path="/auth" component="" />
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
    <>
      <Toolbar />
      {routes}
      <Footer />
    </>
  );
};

export default withRouter(App);
