import React from 'react';
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import ShopPage from './pages/Shop/shop.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact="true" path="/">
            <HomePage />
          </Route>
          <Route exact="true" path="/shop">
            <ShopPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
