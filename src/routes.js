import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Pages from './pages'

export default function Routes({ setLoad }){
    
    const [logged, setLogged] = useState();


    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" render={(props) => 
                    <Pages.Home setLoad={setLoad} 
                                logged={logged} 
                                setLogged={setLogged} />} exact />
                <Route path="/login" render={(props) => 
                    <Pages.Login setLoad={setLoad}
                                 logged={logged} 
                                 setLogged={setLogged} />} exact />
                <Route path="/time-entry" render={(props) => <Pages.TimeEntry setLoad={setLoad} />} exact />
                <Route path="/two" render={(props) => <Pages.Two setLoad={setLoad} />} exact />
                <Route path="/three" render={(props) => <Pages.Three setLoad={setLoad} />} exact />
                <Route path="/four" render={(props) => <Pages.Four setLoad={setLoad} />} exact />
                <Route path="/hoursProvisioning" render={(props) => <Pages.HoursProvisioning setLoad={setLoad} />} exact />
                <Route path="/UserRegister" render={(props) => <Pages.UserRegister setLoad={setLoad} />} exact />
                <Route path="/ProjectRegister" render={(props) => <Pages.ProjectRegister setLoad={setLoad} />} exact />
                <Route path="/CustCenterRegister" render={(props) => <Pages.CustCenterRegister setLoad={setLoad} />} exact />
                <Route path="/three/ResourcesAllocation" render={(props) => <Pages.ResourcesAllocation setLoad={setLoad} />} exact />
            </Switch>
        </BrowserRouter>
    );
}