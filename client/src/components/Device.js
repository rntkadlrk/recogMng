import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DeviceAdd from './DeviceAdd';

// 디자인
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import DeviceDelete from './DeviceDelete';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function Device(){
   // const navigate = useNavigate();
    const [DeviceData, setDeviceData] = useState([]);
    

    useEffect(() => {
      axios.get('/api/device')
      .then(response => {
        // 수행할 동작
         console.log(response)
        
         setDeviceData(response.data.device);
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
           <DeviceAdd/>
          </div>
          </Box>
         
        <Paper sx={{
          marginLeft: 3,
          marginRight: 3,
        }}>
         
        
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>등록번호</TableCell>
                <TableCell>시리얼</TableCell>
                <TableCell>장치명</TableCell>
                <TableCell>주소</TableCell>
                <TableCell>삭제</TableCell>
              </TableRow>
            </TableHead> 
            
            <TableBody>
            
            {/* {Customer.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})}  */}
            {DeviceData.map((rows)=>{
              return(
                
                <TableRow key={rows.seq}>
                  <TableCell>{rows.seq}</TableCell>
                  <TableCell>{rows.serial}</TableCell>
                  <TableCell>{rows.devicename}</TableCell>
                  <TableCell>{rows.addr}</TableCell>
                  <TableCell><DeviceDelete seq={rows.seq}/></TableCell>
                </TableRow>
                
              )})
            }
            
            </TableBody>
          </Table>
        </Paper>
        
      </div>
    );
}
export default Device;