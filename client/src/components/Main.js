import React, {useState, useEffect} from 'react';
import axios from 'axios';


// 디자인
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


function Main(){
   // const navigate = useNavigate();
    const [HistoryData, setHistoryData] = useState([]);
    const [SearchName, setSearchName] = useState('');

    useEffect(() => {
      axios.get('/api/searchPage')
      .then(response => {
        // 수행할 동작
         console.log(response)
        
        setHistoryData(response.data.history);
      })
      
    }, []);
     

    const onSearchHandler = (e) =>{
      
      setSearchName(e.currentTarget.value)
    }
  

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
           환영합니다.
          </Box>
         
        <Paper sx={{
          marginLeft: 3,
          marginRight: 3,
        }}>
         
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>순서</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년원일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>시간</TableCell>
              </TableRow>
            </TableHead> 
            
            <TableBody>
            
            {/* {Customer.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})}  */}
            {HistoryData.map((rows)=>{
              return(
                
                <TableRow key={rows.seq}>
                  <TableCell>{rows.seq}</TableCell>
                  <TableCell>{rows.image === 'null' ? "이미지없음":<img src={rows.image} alt="profile"/>}</TableCell>
                  <TableCell>{rows.name}</TableCell>
                  <TableCell>{rows.birthday}</TableCell>
                  <TableCell>{rows.gender}</TableCell>
                  <TableCell>{rows.job}</TableCell>
                  <TableCell>{rows.createDate}</TableCell>
                  {/* <TableCell><CustomerDelete seq={rows.seq}/></TableCell> */}
                </TableRow>
                
              )})
            }
            
            </TableBody>
          </Table>
        </Paper>
        
      </div>
    );
}
export default Main;