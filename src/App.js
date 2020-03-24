import React from 'react';
import Form from './components/Form'
import Routes from './routes'
import * as Comp from './components'

function App() {
  return (
    <>
      <Comp.Menu />
      <Comp.SideMenu />
      <Routes />
    </>
  );
}

export default App;
