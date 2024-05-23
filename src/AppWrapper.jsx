import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App'; // Adjust the import path as necessary
import Dish from './components/Dish';
import EditDish from './components/EditDish'
import MenuGenerator from './components/MenuGenerator'
import AllMenus from './components/AllMenus'
import MenuDetails from './components/MenuDetails'
import Ingredients from './components/Ingredients'

const AppWrapper = () => {
 return (
   <Router>
     <Switch>
       <Route exact path="/" component={App} />
       <Route path="/dish/:id" component={Dish} />
       <Route path="/editDish/:id" component={EditDish} />
       <Route path="/editDish" component={EditDish} />
       <Route path="/menuGenerator" component={MenuGenerator} />
       <Route path="/allMenus" component={AllMenus} />
       <Route path="/menuDetails/:id" component={MenuDetails} />
       <Route path="/ingredients" component={Ingredients} />
       {/* Add more routes as needed */}
     </Switch>
   </Router>
 );
};

export default AppWrapper;
