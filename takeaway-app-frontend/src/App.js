import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
// import Header from './components/Layout/Header';
import Home from './components/Home/Home';
import Toolbar from './components/UI/Navigation/Toolbar/Toolbar';

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
    </>
  );
};

export default withRouter(App);
