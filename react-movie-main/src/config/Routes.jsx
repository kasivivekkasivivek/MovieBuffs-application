import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/detail/Detail';

const Routes = () => {
    return (
        // route and swith method to route the nav bar based on the user navigation input 
        <Switch>
            <Route
                path='/:category/search/:keyword'
                component={Catalog} // navigate based on user input 
            />
            <Route
                path='/:category/:id'
                component={Detail} // navigate to specific movie based on id 
            />
            <Route
                path='/:category'
                component={Catalog} // navigate nbased on category that id to /movies or /tv shows 
            />
            <Route
                path='/'
                exact
                component={Home} // just /home  or / to navigate to the main page  
            />
        </Switch>
    );
}

export default Routes;
