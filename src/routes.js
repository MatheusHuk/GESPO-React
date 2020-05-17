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
                <Route path="/timeEntry" render={(props) => 
                    <Pages.TimeEntry setLoad={setLoad} 
                                     logged={logged} />} exact />
                <Route path="/dashboards" render={(props) => <Pages.Dashboards setLoad={setLoad} />} exact />
                <Route path="/projectManagement/goalsDefinition" render={(props) => <Pages.HoursProvisioning setLoad={setLoad} />} exact />
                <Route path="/projectManagement/HoursProvisioning" render={(props) => <Pages.HoursProvisioningReal setLoad={setLoad} />} exact />
                <Route path="/projectManagement" render={(props) => <Pages.ProjectManagement setLoad={setLoad} />} exact />
                <Route path="/projectManagement/ResourcesAllocation" render={(props) => <Pages.ResourcesAllocation setLoad={setLoad} />} exact />
                <Route path="/register" render={(props) => <Pages.Register setLoad={setLoad} />} exact />
                <Route path="/register/UserRegister" render={(props) => <Pages.UserRegister setLoad={setLoad} />} exact />
                <Route path="/register/ProjectRegister" render={(props) => <Pages.ProjectRegister setLoad={setLoad} />} exact />
                <Route path="/register/CustCenterRegister" render={(props) => <Pages.CustCenterRegister setLoad={setLoad} />} exact />
            </Switch>
        </BrowserRouter>
    );
}