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
   
    const [HistoryData, setHistoryData] = useState([]);
    const [SearchName, setSearchName] = useState('');
    const [Files, setFiles] = useState('');
    const [UserName, setUserName] = useState('');
    const [FileName, setFileName] = useState(''); 
    const [open, setOpen] = useState(false);
    const [MapData, setMapData] = useState([]);
    const [FileUrl, setFileUrl] = useState("");
    const [FromDate, setFromDate] = useState("");
    const [ToDate, setToDate] = useState("");
    
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

    const handlingDataForm = async dataURI => {
      // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로 ','를 기점으로 잘라서 ~~~~~인 부분만 다시 인코딩
      const byteString = atob(dataURI.split(",")[1]);
    
      // Blob를 구성하기 위한 준비, 이 내용은 저도 잘 이해가 안가서 기술하지 않았습니다.
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ia], {
        type: "image/jpeg"
      });
      const file = new File([blob], "image.jpg");
    
      // 위 과정을 통해 만든 image폼을 FormData에 넣어줍니다.
      // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야합니다.
      const formData = new FormData();
      formData.append("representative_avatar", file);
    
      // 필요시 더 추가합니다.
      formData.append("name", "nkh");
      formData.append("email", "noh5524@gmail.com");
    
      try {
        //const changeAvatar = await formData;
        //alert(JSON.stringify(formData));
      } catch (error) {
        alert(error);
      }
    };
 
    
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
      // if(File){
      //   searchImage();
      // }else{
      //   searchName();
      // }
      
    }
    //console.log(HistoryData)
    const clickOpenHandler = (e) =>{
      setOpen(true);
    }

    const searchForMap = () =>{
      // 맵용 서치 로직
    }

    const searchSubmit = (e) =>{
      
      let url = '/api/searchPage';
      const formData = new FormData();
      //formData.append('image', Files)
      formData.append('name', SearchName);
      formData.append('fromDate', FromDate);
      formData.append('toDate', ToDate);
     
      //console.log(Base64data.split(",")[1]);

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
          console.log(response.data[0]);
          // 쿼리 작성
          response.data.map((rows,index)=>{
            formData.append('route', rows );
          })
          return axios.post(url, formData)
          .then( response => {
        
            console.log(response.data.history)
            setHistoryData(response.data.history)
          
          });
        });
      }
      console.log("서브밋 정상");
      
      return axios.post(url, formData)
      .then( response => {
        
        console.log(response.data.history)
        setHistoryData(response.data.history)
      
      });

      //  axios.get('/api/searchPage')
      // .then(response => {
      //   // 수행할 동작
      //   // console.log(response)
        
      //   setHistoryData(response.data.history);
      // })

    }

    useEffect(() => {
      // mapDataHandler();
      // axios.get('/api/searchPage')
      // .then(response => {
      //   // 수행할 동작
      //   // console.log(response)
        
      //   setHistoryData(response.data.history);
      // })
      
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
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                    <img className="top_bar_profile_img" src={FileUrl} alt="이미지 미리보기" />
                    <input className="hidden" type="file" accept="image/*" id="raised-button-file" file={Files} value={FileName} onChange={onFileHandler}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {FileName === "" ?"프로필 이미지 선택" : FileName}
                        </Button>
                    </label><br/>
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
                <TableCell>이미지</TableCell>
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
                      <TableCell>{rows.imageRoute === 'null' ? "이미지없음":<img src={rows.image} alt="profile"/>}</TableCell>
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