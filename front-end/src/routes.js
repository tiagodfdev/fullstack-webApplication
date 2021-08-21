/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { TokenContext } from './context/Token';
import ClientDetails from './pages/ClientDetails';
import LoginPage from './pages/Login';
import Main from './pages/Main';
import NewClient from './pages/NewClient';
import NotFound from './pages/NotFound';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(TokenContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />;
  }
  return <Route {...rest} />;
}

export default function AppRoutes() {
  return (
    <Router>
      <Switch>
        <CustomRoute exact path="/login" component={LoginPage} />
        <CustomRoute isPrivate exact path="/" component={Main} />
        <CustomRoute exact isPrivate path="/client/:id" component={ClientDetails} />
        <CustomRoute isPrivate path="/new-client" component={NewClient} />
        <CustomRoute isPrivate path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}
