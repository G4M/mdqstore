import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Home from './containers/Home/Home';
import { CartContexProvider } from './contexts/CartContext/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ItemDetailContainer from './containers/ItemDetailContainer/ItemDetailContainer';
import CartContainer from './containers/CartContainer/CartContainer';

function App() {

  return (
    <BrowserRouter>
      <CartContexProvider>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/item/:itemId">
            <ItemDetailContainer />
          </Route>
          <Route path="/Cart">
            <CartContainer />
          </Route>
          <Route path="/Categorys/:categoryId">
            <Home />
          </Route>
        </Switch>
      </CartContexProvider>
    </BrowserRouter>
  );
}

export default App;
