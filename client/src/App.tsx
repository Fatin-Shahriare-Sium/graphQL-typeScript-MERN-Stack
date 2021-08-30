import React from 'react';
import Signup from './component/signup/signup';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './component/login/login';
import Main from './component/main/main';
import DataProvider from './store';
import createHistory from 'history/createBrowserHistory';
//greate blog to understand react-profiler,alhamdulillah - https://www.pluralsight.com/guides/profiling-performance-with-react-developer-tools
function App() {
  const history = createHistory();
  let client = new ApolloClient({
    uri: "https://social-graphqlx.herokuapp.com/graphql",
    connectToDevTools: true,
    cache: new InMemoryCache(),


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
