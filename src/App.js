import React from 'react';

import HomePage from "./pages/homepage/homepage.component";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import ShopPage from './pages/Shop/shop.component';
import SignInAndSignUpPage from './pages/Sign-in-Sign-up/Sign-in-and-sing-up.component';
import Header from './components/Header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
import './App.css';
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          this.props.setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        })
      }
      setCurrentUser(userAuth);
    });



  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/shop">
              <ShopPage />
            </Route>
            <Route exact path="/checkout" >
              <CheckoutPage />
            </Route>
            <Route exact path="/signin" >
              {
                this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
