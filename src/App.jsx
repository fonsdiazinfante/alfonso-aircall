import React, { useEffect, useState } from 'react';
import Inbox from './pages/inbox.jsx';
import Archived from './pages/archived.jsx';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import Header from './Header.jsx';

function App() {
    const [calls, setCalls] = useState([])
    const [callUpdate, setCallUpdate] = useState([])

    const url = "https://aircall-job.herokuapp.com/activities/"  
    const reset_url = "https://aircall-job.herokuapp.com/reset"  
    
    async function fetchCalls() {
        const response = await fetch(url);
        const json = await response.json();
        setCalls(json);
        console.log(json)
    }

      async function resetCalls() {
        const response = await fetch(reset_url);
        const json = await response.json();
        setCallUpdate(json)
    }
    
    useEffect (() => {
        fetchCalls()
    }, [callUpdate])

  return (
    <div className='container'>
    <Header/>
     <Tabs
      defaultActiveKey="calls"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="calls" title="Calls">
          <Inbox calls={calls} url={url} callUpdate={setCallUpdate}/>
      </Tab>
      <Tab eventKey="archived" title="Archived calls">
          <Archived calls={calls} url={url} callUpdate={setCallUpdate}/>
      </Tab>
    </Tabs>
    <Button id="reset" variant="warning" onClick={() => resetCalls()}>Reset All Calls</Button>
    </div>
  );
};

export default App;
