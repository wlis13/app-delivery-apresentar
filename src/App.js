import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Admin from './pages/admin';
import Product from './pages/products';
import Checkout from './pages/checkout';
import CustomerOrders from './pages/orders';
import OrderDetails from './pages/orderDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/admin/manage" component={ Admin } />
      <Route path="/customer/orders/:id" component={ OrderDetails } />
      <Route path="/customer/products/" component={ Product } />
      <Route path="/customer/checkout/" component={ Checkout } />
      <Route path="/customer/orders/" component={ CustomerOrders } />
      <Route path="/seller/orders/:id" component={ OrderDetails } />
      <Route path="/seller/orders/" component={ CustomerOrders } />
    </Switch>
  );
}

export default App;
