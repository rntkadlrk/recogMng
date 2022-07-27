/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AppBarPage from './components/AppBarPage';
import Main from './components/Main';
import SearchPage from './components/SearchPage';
import Device from './components/Device'

import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Search from '@mui/icons-material/Search';



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
      <AppBarPage></AppBarPage>
      <div className="App">
      <div id="progressBarContainer">
       <div id="progressBar" style={{transform: `scale(${scroll}, 1)`, opacity: `${scroll}`}} />
      </div>
        <Routes>
          <Route exact path="/" element={<Main/>}/>
          <Route exact path="/user" element={<Customer/>}/>
          <Route exact path="/device" element={<Device/>}/>
          <Route exact path="/searchPage" element={<SearchPage/>}/>
        </Routes>
        
      </div>
    </Router>
  );
  
}

export default App;
