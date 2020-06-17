import React, { useState, useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import Routes from './routes'
import { Loading } from './components'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [loading, setLoading] = useState(true);

  const [showMenu, setShowMenu] = useState(false);

  const setLoad = (l) => {
    setLoading(l);
  }
  
  return (
    <>
        <CookiesProvider>
          <Loading load={loading} />
          <Routes setLoad={setLoad} showMenu={showMenu} setShowMenu={setShowMenu} />
        </CookiesProvider>
    </>
  );
}

export default App;
