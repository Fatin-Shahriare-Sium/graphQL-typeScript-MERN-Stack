import React, { useEffect } from 'react';
import Signup from './component/signup/signup';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter, Switch, Route, useHistory, Router, Redirect } from 'react-router-dom'
import Login from './component/login/login';
import Main from './component/main/main';
import DataProvider, { useData } from './store';
import createHistory from 'history/createBrowserHistory';

function App() {
  const history = createHistory();
  let { auth } = useData()
  let client = new ApolloClient({
    uri: "http://localhost:5000",
    cache: new InMemoryCache()

  })

  if (!localStorage.getItem("__tokenx")) {
    history.push('/login')
  }

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <DataProvider>


          <Switch>
            <Route exact path='/'>
              <Main />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>

          </Switch>


        </DataProvider>
      </ApolloProvider >
    </BrowserRouter>

  );
}

export default App;
