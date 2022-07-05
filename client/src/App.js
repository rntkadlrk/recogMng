import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Customer from './components/Customer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
//import { withStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
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
  //const {classes} = props.styles;

    // const [customersData, setCustomersData] = useState([]);
  
    // const callApi = async () => {
    //   const response = await fetch('/api/customers');
    //   const body = await response.json();
    //  // console.log("" + body);    //TODO: 콘솔 찍어보셈
    //   return body;
    // };
    
    // useEffect(() => {
    //   callApi().then((data) => setCustomersData(data));
    // }, []);
    // //console.log(customersData); 

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
      <div className="App">
      <div id="progressBarContainer">
       <div id="progressBar" style={{transform: `scale(${scroll}, 1)`, opacity: `${scroll}`}} />

      </div>
        <Routes>
          <Route exact path="/customers" element={<Customer/>}/>
        </Routes>
        
      </div>
    </Router>
  );
  
}

export default App;
