import React from 'react';
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import ShopPage from './pages/Shop/shop.component';
import SignInAndSignUpPage from './pages/Sign-in-Sign-up/Sign-in-and-sing-up.component';
import Header from './components/Header/header.component';
import { auth } from './firebase/firebase.util';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      currentUser:null
    }

  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log(user);
    })
  }
  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact="true" path="/">
            <HomePage />
          </Route>
          <Route exact="true" path="/shop">
            <ShopPage />
          </Route>
          <Route exact="true" path="/signin">
            <SignInAndSignUpPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
  }
}

export default App;
