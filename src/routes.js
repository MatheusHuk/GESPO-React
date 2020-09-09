import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import * as Pages from './pages'

export default function Routes({ setLoad, showMenu, setShowMenu }){
    
    const [logged, setLogged] = useState();

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" render={(props) => 
                    <Pages.Home 
                        setLoad={setLoad} 
                        logged={logged} 
                        setLogged={setLogged}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />}
                    exact />
                <Route path="/login" render={(props) =>
                    <Pages.Login
                        setLoad={setLoad}
                        logged={logged} 
                        setLogged={setLogged}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />} 
                    exact />
                <Route path="/timeEntry" render={(props) =>
                    <Pages.TimeEntry
                        setLoad={setLoad} 
                        logged={logged}
                        setLogged={setLogged}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}/>}
                    exact />
                <Route path="/dashboards" render={(props) => <Pages.Dashboards setLoad={setLoad} />} exact />
                <Route path="/projectManagement/hoursProvisioning" render={(props) =>
                    <Pages.HoursProvisioning
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}/>}
                    exact />
                <Route path="/projectManagement" render={(props) => 
                    <Pages.ProjectManagement 
                        logged={logged}
                        setLoad={setLoad}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />} 
                    exact />
                <Route path="/projectManagement/resourcesAllocation" render={(props) => 
                    <Pages.ResourcesAllocation
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}/>}
                    exact />
                <Route path="/projectManagement/goalsDefinition" render={(props) => 
                    <Pages.GoalsDefinition 
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />} 
                    exact />
                <Route path="/register" render={(props) => 
                    <Pages.Register 
                        logged={logged}
                        setLoad={setLoad}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />} 
                    exact />
                <Route path="/register/userRegister" render={(props) => 
                    <Pages.UserRegister
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />} 
                    exact />

                <Route path="/register/projectRegister" render={(props) =>
                    <Pages.ProjectRegister
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}  
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                    />} exact />
                <Route path="/register/categoryRegister" render={(props) =>
                    <Pages.CategoryRegister
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}  
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />}                   
                    exact />
                <Route path="/register/teamRegister" render={(props) =>
                    <Pages.TeamRegister
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}  
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />}                 
                    exact />
                <Route path="/register/custCenterRegister" render={(props) => 
                    <Pages.CustCenterRegister 
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />}
                    exact />
                <Route path="/register/officeRegister" render={(props) =>
                    <Pages.OfficeRegister
                        setLoad={setLoad}
                        logged={logged}
                        setLogged={setLogged}  
                        showMenu={showMenu}
                        setShowMenu={setShowMenu} />}                 
                    exact />                   
            </Switch>
        </BrowserRouter>
    );
}