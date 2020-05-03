import React from 'react';
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import ShopPage from './pages/Shop/shop.component';
import SignInAndSignUpPage from './pages/Sign-in-Sign-up/Sign-in-and-sing-up.component';
import Header from './components/Header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }

  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        })
      }
      this.setState({ currentUser: userAuth });
    });



  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header currentUser={this.state.currentUser}></Header>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/shop">
              <ShopPage />
            </Route>
            <Route exact path="/signin" >
              <SignInAndSignUpPage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
