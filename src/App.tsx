import React from 'react';
import logo from './logo.svg';
import './App.less';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Layout } from 'antd'

function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Layout>
          <Switch>
            {/* <Redirect exact from="/" to="/gui" /> */}
            <Route exact path="/">
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                  </p>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </header>
              </div>
            </Route>

            <Redirect from="/" to="/404" />
          </Switch>
        </Layout>
      </Route>
    </BrowserRouter>
  );
}

export default App;
