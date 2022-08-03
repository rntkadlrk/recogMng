import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CustomerAdd from './CustomerAdd';
import imageCompression from 'browser-image-compression'; 

// 디자인
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import CustomerDelete from './CustomerDelete';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';



function Customer(){
   // const navigate = useNavigate();
    const [CustomersData, setCustomersData] = useState([]);
    const [Customers, setCustomers] = useState([]);

    const stateRefresh = () => {
      setCustomersData([]);
      axios.get('/api/user')
      .then(response => {
        // 수행할 동작
         console.log('호출됨!!')
        
        setCustomersData(response.data.customers);
      })
      
    }

    useEffect(() => {
      axios.get('/api/user')
      .then(response => {
        // 수행할 동작
         console.log(response)
        
        setCustomersData(response.data.customers);
      })
      
    }, []);
     

    // const test = customersData.map((item, index) =>{
        
    // })

    return (
      <div>
         <Box sx={{
               marginTop: 2,
               marginBottom: 2,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
          }}>
          <div className="menu">
           <CustomerAdd stateRefresh={stateRefresh}/>
          </div>
          </Box>
         
        <Paper sx={{
          marginLeft: 3,
          marginRight: 3,
        }}>
         
        
          <Table >
            <TableHead>
              <TableRow>
                <TableCell >등록번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년원일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead> 
            
            <TableBody>
            
            {/* {Customer.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})}  */}
            {CustomersData.map((rows)=>{
              return(
                
                <TableRow key={rows.seq}>
                  <TableCell>{rows.seq}</TableCell>
                  <TableCell>{rows.image === 'null' ? "이미지없음":<img src={rows.image} alt="profile"/>}</TableCell>
                  <TableCell>{rows.name}</TableCell>
                  <TableCell>{rows.birthday}</TableCell>
                  <TableCell>{rows.gender}</TableCell>
                  <TableCell>{rows.job}</TableCell>
                  <TableCell><CustomerDelete seq={rows.seq}/></TableCell>
                </TableRow>
                
              )})
            }
            
            </TableBody>
          </Table>
        </Paper>
        
      </div>
    );
}
export default Customer;