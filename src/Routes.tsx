import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import BeerList from "./Pages/BeerList";
import Home from "./Pages/Home";
// import ReactGA from "react-ga";

const Routes = () => {

  return (
    <Router>
      <Switch>
        <Route exact path={"/"} render={() => <Redirect to={"/home"} />} />
        <Route path={"/home"} component={Home} />
        <Route path={"/beerlist"} component={BeerList} />
      </Switch>
    </Router>
  );
};

export default Routes;
