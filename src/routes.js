import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Pages from './pages'

export default function Routes({ goto }){
    
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" render={(props) => <Pages.Home goto={goto}/>} exact />
                <Route path="/one" render={(props) => <Pages.One goto={goto} />} exact />
                <Route path="/two" render={(props) => <Pages.Two goto={goto} />} exact />
                <Route path="/three" render={(props) => <Pages.Three goto={goto} />} exact />
                <Route path="/four" render={(props) => <Pages.Four goto={goto} />} exact />
            </Switch>
        </BrowserRouter>
    );
}