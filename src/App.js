import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Form from './components/Form'
import Routes from './routes'
import * as Comp from './components'
import './index.css';

function App() {

  const [route, setRoute] = useState("/");

  const goTo = (r) => {
    setRoute(r);
  }

  return (
    <>
      <Comp.Menu />
      <Comp.SideMenu route={route}/>
      <div class="todo">
        <Routes goto={goTo}/>
      </div>
    </>
  );
}

export default App;
