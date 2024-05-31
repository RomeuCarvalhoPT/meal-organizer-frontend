import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import App from './App'; 
import Dish from './components/Dish';
import EditDish from './components/EditDish'
import MenuGenerator from './components/MenuGenerator'
import AllMenus from './components/AllMenus'
import MenuDetails from './components/MenuDetails'
import Ingredients from './components/Ingredients'

function AppWrapper() {
  return (
    <Router>
         <Switch>
          <Route path="/login" component={Login} />
           <ProtectedRoute exact path="/" component={App} />
           <ProtectedRoute path="/dish/:id" component={Dish} />
           <ProtectedRoute path="/editDish/:id" component={EditDish} />
           <ProtectedRoute path="/editDish" component={EditDish} />
           <ProtectedRoute path="/menuGenerator" component={MenuGenerator} />
           <ProtectedRoute path="/allMenus" component={AllMenus} />
           <ProtectedRoute path="/menuDetails/:id" component={MenuDetails} />
           <ProtectedRoute path="/ingredients" component={Ingredients} />
           {/* Add more routes as needed */}
         </Switch>
    </Router>
  );
}

export default AppWrapper;
