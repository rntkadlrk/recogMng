import React, { useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// const styles = theme => ({
//   root:{
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: "auto"
//   },
//   table:{
//     minWidth: 1080
//   }
// })


function App() {

    const [scroll, setScroll] = useState(0);

    useEffect(() => {

      let progressBarHandler = () => {
          
          const totalScroll = document.documentElement.scrollTop;
          const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scroll = `${totalScroll / windowHeight}`;

          setScroll(scroll);
      }

      window.addEventListener("scroll", progressBarHandler);

      return () => window.removeEventListener("scroll", progressBarHandler);
    });

    return(
    <Router>
      <div className="root">
      <div id="progressBarContainer">
       <div id="progressBar" style={{transform: `scale(${scroll}, 1)`, opacity: `${scroll}`}} />

      </div>
        <Routes>
          <Route exact path="/customers" element={<Customer/>}/>
          <Route exact path="/test" element={<Customer/>}/>
        </Routes>
        
      </div>
    </Router>
  );
  
}

export default App;
