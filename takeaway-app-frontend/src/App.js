import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './components/Home/Home';

const App = () => {
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

export default App;
