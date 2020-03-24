import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Pages from './pages'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" render={(props) => <Pages.Home />} exact />
                <Route path="/foda" render={(props) => <Pages.Home />} exact />
            </Switch>
        </BrowserRouter>
    );
}