import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './components/pages/Main'; 
import Dish from './components/pages/Dish';
import EditDish from './components/pages/EditDish'
import GenerateMenu from './components/pages/GenerateMenu'
import AllMenus from './components/pages/AllMenus'
import MenuDetails from './components/pages/MenuDetails'
import Ingredients from './components/pages/Ingredients'
import Register from './components/pages/Register'

function AppWrapper() {
  return (
    <Router>
         <Switch>
           <Route path="/register" component={Register} />
           <Route path="/login" component={Login} />
           <ProtectedRoute exact path="/" component={Main} />
           <ProtectedRoute path="/dish/:id" component={Dish} />
           <ProtectedRoute path="/editDish/:id" component={EditDish} />
           <ProtectedRoute path="/editDish" component={EditDish} />
           <ProtectedRoute path="/generateMenu" component={GenerateMenu} />
           <ProtectedRoute path="/allMenus" component={AllMenus} />
           <ProtectedRoute path="/menuDetails/:id" component={MenuDetails} />
           <ProtectedRoute path="/ingredients" component={Ingredients} />
           <ProtectedRoute path="/file" component={Ingredients} />
           
           {/* Add more routes as needed */}
         </Switch>
    </Router>
  );
}

export default AppWrapper;
