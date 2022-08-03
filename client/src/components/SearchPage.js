import React, {useState, useEffect} from 'react';
import axios from 'axios';
import post from 'axios';

// map
import Map from './KMap';

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
import Button from '@mui/material/Button';
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


function SearchPage(){
   // const navigate = useNavigate();
    const [HistoryData, setHistoryData] = useState([]);
    const [SearchName, setSearchName] = useState('');
    const [File, setFile] = useState('');
    const [UserName, setUserName] = useState('');
    const [FileName, setFileName] = useState(''); 
    const [open, setOpen] = useState(false);

    const onFileHandler = (e) =>{
      console.log(e.target.files[0])
      setFile(e.target.files[0])
      setFileName(e.currentTarget.value)
    }
    const onUserNameHandler = (e) =>{
        setUserName(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
      e.preventDefault();
      searchImage()
      .then((response) => {
          console.log(response.data);
      })
      setFile('');
      setUserName('');
      setFileName('');
      
      //window.location.reload();
    }

    const clickOpenHandler = (e) =>{
      setOpen(true);
    }

    const searchImage = () =>{
      const url = '/api/searchPage';
      const formData = new FormData();
      formData.append('image', File)
      formData.append('name', UserName);
      const config={
        headers: {
            'content-type': 'multipart/form-data'
        }
      }
      return post(url, formData, config);
    }

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
               //alignItems: 'center',
          }}>
            <div className="menu">
              <Paper sx={{
                marginLeft: 3,
                marginRight: 3,
                backgroundColor: '#f3f6f4',
              }}>
                
                <Box
                  //component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                   <input className="hidden" type="file" accept="image/*" id="raised-button-file" file={File} value={FileName} onChange={onFileHandler}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {FileName === "" ?"프로필 이미지 선택" : FileName}
                        </Button>
                    </label><br/>
                  <TextField label="이름으로 검색.."  type="text"  variant="standard" value={SearchName} onChange={onSearchHandler} ></TextField>
                  <TextField label=" " type="date"  variant="standard" />

                  <TextField label=" " type="date"  variant="standard" />
                  <Button variant='contained' color="primary" component="span">
                    검색
                  </Button>
                </Box>
              </Paper>
            </div>
          </Box>
          
          <Paper sx={{
                marginLeft: 3,
                marginRight: 3,
                backgroundColor: '#f3f6f4',
              }}>
            <Box
                 sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'center',}}
            >
              <Map></Map>
            </Box>
        </Paper>
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
export default SearchPage;