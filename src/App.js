import React, {Component}from 'react';
import {Switch,Route} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Details from './Components/Details';
import Cart from './Components/Cart/Cart';
import Default from './Components/Default';
import Model from './Components/Model';


function App() {
  return (
    <div className="container">
        <React.Fragment>
          <Navbar />
          <Switch>

            <Route exact path="/" component={ProductList} />
            <Route path="/details" component={Details}/>
            <Route path="/cart" component={Cart} />
            <Route component={Default} />
          </Switch>
          <Model/>
        </React.Fragment>
    </div>
  );
}

export default App;
