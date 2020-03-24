import React from 'react';
import Form from './components/Form'
import Routes from './routes'
import * as Comp from './components'
import './index.css';

function App() {
  return (
    <>
      <Comp.Menu />
      <Comp.SideMenu />
      <div class="todo">
        <Routes />
      </div>
    </>
  );
}

export default App;
