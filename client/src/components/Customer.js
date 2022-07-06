import React, {useState, useEffect} from 'react';
import axios from 'axios';

// 디자인
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

function Customer(){
   // const navigate = useNavigate();
    const [CustomersData, setCustomersData] = useState([]);

    useEffect(() => {
      axios.get('/api/test')
      .then(response => {
        // 수행할 동작
         console.log(response)
        
        setCustomersData(response.data.customers);
      })
      
    }, []);
     

    // const test = customersData.map((item, index) =>{
        
    // })

    return (
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년원일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead> 
        <TableBody>
         
         {/* {Customer.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})}  */}
         {CustomersData.map((rows)=>{
          return(
            
            <TableRow key={rows.seq}>
              <TableCell>{rows.seq}</TableCell>
              <TableCell><img src={rows.image} alt="profile"/></TableCell>
              <TableCell>{rows.name}</TableCell>
              <TableCell>{rows.birthday}</TableCell>
              <TableCell>{rows.gender}</TableCell>
              <TableCell>{rows.job}</TableCell>
            </TableRow>
            
          )})
         }
        
        </TableBody>
      </Table>
    </Paper>
     
    );
}
export default Customer;