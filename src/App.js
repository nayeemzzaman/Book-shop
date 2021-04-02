import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Admin from './components/Admin/Admin';
import Shop from './components/Shop/Shop';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';

export const userContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
          <Header></Header>
          <hr />
          <Switch>
            <Route exact path="/">
              <Shop/>
            </Route>
            <PrivateRoute path="/admin">
              <Admin/>
            </PrivateRoute>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <PrivateRoute path="/checkOut/:id">
              <Checkout></Checkout>
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
          </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
