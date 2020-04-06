import React, { useState, useEffect } from 'react';
import Routes from './routes'
import { Loading } from './components'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [loading, setLoading] = useState(false);

  const setLoad = (l) => {
    setLoading(l);
  }
  return (
    <>
        <Loading load={loading} />
        <Routes setLoad={setLoad}/>
    </>
  );
}

export default App;
