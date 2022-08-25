/* eslint-disable */

import React, {useState, useEffect} from 'react';
import axios from 'axios';
//import post from 'axios';
import imageCompression from 'browser-image-compression';

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
//import { response } from 'express';

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
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month  + '-' + day;
    
    const [HistoryData, setHistoryData] = useState([]);
    const [SearchName, setSearchName] = useState('');
    const [Files, setFiles] = useState('');
    const [UserName, setUserName] = useState('');
    const [FileName, setFileName] = useState(''); 
    const [open, setOpen] = useState(false);
   // const [MapData, setMapData] = useState([]);
    const [FileUrl, setFileUrl] = useState("");
    const [FromDate, setFromDate] = useState(dateString);
    const [ToDate, setToDate] = useState(dateString);
    
   
    let map = <Map searchData={HistoryData}></Map>;
    const [Base64data, setBase64Data] = useState('');

    const onFileHandler = async (e) => {
      let file = e.target.files[0];	// 입력받은 file객체
  
      // 이미지 resize 옵션 설정 (최대 width을 100px로 지정)
      const options = { 
          maxSizeMB: 2, 
          maxWidthOrHeight: 100
      }
      
      try {
        const compressedFile = await imageCompression(file, options);
         // FileReader 는 File 혹은 Blob 객체를 이용하여, 파일의 내용을 읽을 수 있게 해주는 Web API
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
        // 변환 완료!
        setBase64Data(reader.result);
         
        // formData 만드는 함수
        //handlingDataForm(base64data);
        };
        setFiles(compressedFile);
        
        // resize된 이미지의 url을 받아 fileUrl에 저장
        const promise = imageCompression.getDataUrlFromFile(compressedFile);
        promise.then(result => {
            setFileUrl(result);
        })
      } catch (error) {
          console.log(error);
      }
      setFileName(result)

    }
    const onTruncateHandler = (e) =>{
      setFileUrl("");
    }
    const onFromDateHandler = (e) =>{
        setFromDate(e.currentTarget.value);
    }
    const onToDateHandler = (e) =>{
      setToDate(e.currentTarget.value);
    }
    const onUserNameHandler = (e) =>{
      setUserName(e.currentTarget.value);
      setSearchName(e.currentTarget.value);
    }

    const onSubmitHandler = (e) =>{
      e.preventDefault();
      searchSubmit();
    }
    //console.log(HistoryData)
    const clickOpenHandler = (e) =>{
      setOpen(true);
    }

    const searchSubmit = (e) =>{
      setHistoryData([]);

      if(!FromDate || !ToDate){
        alert("날짜를 입력해주세요");
        return false;
      }
      let url = '/api/searchPage';
      const formData = new FormData();
      //formData.append('image', Files)
      formData.append('name', SearchName);
      formData.append('fromDate', FromDate);
      formData.append('toDate', ToDate);
     
      //이미지로 검색할 경우
      if(Base64data){
        const imageUrl = '/find';
        const imageData = JSON.stringify({
          "base64_string" : Base64data.split(",")[1]
        });
        const config={
          headers: {
            'Content-Type': 'application/json',
          },
        }
       
        return axios.post(imageUrl, imageData, config)
        .then( response=> {
          console.log(response.data);
          // GPU서버에서 받아온 데이터를 로컬 서버 맵 컴포넌트로 넘기기위해 POST 요청으로 데이터 조회를 실시합니다.
          response.data.map((rows) => {
            formData.append('route[]',rows);
          });
          
          return axios.post(url, formData)
          .then( response => {
            // 조회해온 데이터를 테이블에 뿌립니다.
            // console.log(response.data)
            if(!response.data.history.length){
              alert("결과가 없습니다!");
            }
            setHistoryData(response.data.history)
          
          });
        });
      }else if(!SearchName){
        alert("이미지 또는 이름을 입력해주세요.");
        return false;
      }
      //console.log("서브밋 정상");
      
      return axios.post(url, formData)
      .then( response => {
        // 이름으로 조회시 GPU 서버 조회를 생략합니다.
        //console.log(response.data.history)
        if(!response.data.history.length){
          alert("결과가 없습니다!");
        }
        setHistoryData(response.data.history)
        
      });
    }

    useEffect(() => {
    
    }, []);
     
    const onSearchHandler = (e) =>{
      setSearchName(e.currentTarget.value)
    }
  
    return (
      <div>
         <Box sx={{
               marginTop: 2,
               marginBottom: 2,
               display: 'flex',
               flexDirection: 'column',
               //alignItems: 'center',
          }}>
            <Box sx={{
               marginTop: 2,
               marginBottom: 2,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
          }}>
          사진과 이름 모두 입력시 사진이 우선 조건이 됩니다.
          </Box>
           
            <div className="menu">
              <Paper sx={{
                marginLeft: 3,
                marginRight: 3,
                backgroundColor: '#f3f6f4',
              }}>
                
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                    <img className={FileUrl === "" ? "hidden" : ""} src={FileUrl} alt="이미지 미리보기" />
                    <input className="hidden" type="file" accept="image/*" id="raised-button-file" file={Files} value={FileName} onChange={onFileHandler}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {FileName === "" ? "검색 이미지 선택" : FileName}
                        </Button>

                    </label>
                    {FileUrl === "" ? "" : 
                        <Button variant="contained" color="primary" component="span" onClick={onTruncateHandler} >
                            사진 비우기
                        </Button>
                        }
                    <br/>
                  <TextField label="이름으로 검색.."  type="text"  variant="standard" value={SearchName} onChange={onUserNameHandler} ></TextField>
                  <TextField label=" " type="date"  variant="standard" value={FromDate} onChange={onFromDateHandler}/>

                  <TextField label=" " type="date"  variant="standard" value={ToDate} onChange={onToDateHandler}/>
                  <Button variant='contained' color="primary" component="span" onClick={onSubmitHandler}>
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
              {HistoryData.length === 0 ? '' : map}
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
                {/* <TableCell>이미지</TableCell> */}
                <TableCell>이름</TableCell>
                <TableCell>마스크</TableCell>
                <TableCell>온도</TableCell>
                <TableCell>날짜</TableCell>
                <TableCell>시간</TableCell>
                <TableCell>주소</TableCell>
              </TableRow>
            </TableHead> 
            
            <TableBody>
            
            {/* {Customer.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})}  */}
            {
              
              HistoryData && HistoryData.map((rows, index)=>{
               
                  return(
                    <TableRow key={rows.seq}>
                      <TableCell>{index+1}</TableCell>
                      {/* <TableCell>{rows.imageRoute === 'null' ? "이미지없음":<img src={rows.image} alt="profile"/>}</TableCell> */}
                      <TableCell>{rows.name}</TableCell>
                      <TableCell>{rows.maskDetect}</TableCell>
                      <TableCell>{rows.temperature}</TableCell>
                      <TableCell>{rows.frameDate}</TableCell>
                      <TableCell>{rows.frameTime}</TableCell>
                      <TableCell>{rows.addr}</TableCell>
                      {/* <TableCell><CustomerDelete seq={rows.seq}/></TableCell> */}
                    </TableRow>
                    
                  )
              
             })
            }
            
            
            </TableBody>
          </Table>
        </Paper>
        
      </div>
    );
}
export default SearchPage;