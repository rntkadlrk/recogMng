/* eslint-disable */

import React, {useState} from 'react';
//import axios from 'axios';
import { post } from 'axios';
import imageCompression from 'browser-image-compression';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'

function DeviceAdd({stateRefresh}){

    const [DeviceName, setDeviceName] = useState('');
    const [Serial, setSerial] = useState('');
    const [Addr, setAddr] = useState('');
    const [open, setOpen] = useState(false);

    const onDeviceNameHandler = (e) =>{
        setDeviceName(e.currentTarget.value)
    }
    const onSerialHandler = (e) =>{
        setSerial(e.currentTarget.value)
    }
    const onAddrHandler = (e) =>{
        setAddr(e.currentTarget.value)
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        addDevice()
        .then((response) => {
            console.log(response.data);
            stateRefresh();
            clickCloseHandler();
        })
        setDeviceName('');
        setSerial('');
        setAddr('');
        
        
    }

    const clickOpenHandler = (e) =>{
        setOpen(true);
    }

    const clickCloseHandler = (e) =>{
        setDeviceName('');
        setSerial('');
        setAddr('');
        
        setOpen(false);
    }

    const addDevice = ()=>{
        const url = '/api/device';
        const formData = new FormData();
        if(DeviceName===''){
            alert('장치명을 입력해주세요.');
            return;
        }
        formData.append('devicename', DeviceName);
        formData.append('serial', Serial);
        formData.append('addr', Addr);
       
        // const config={
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }

        return post(url, formData);
    }

    return (

        <div>
         
            <Button variant='contained' color='primary' onClick={clickOpenHandler}>
                장치 추가하기
            </Button>
            <Box 
            sx ={{
               
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

            <Dialog open={open} onClose={clickCloseHandler}>
                <DialogTitle>장치 추가</DialogTitle>
                <DialogContent>
                    <TextField required variant="standard" label="장치명" type="text" name="devicename" value={DeviceName} onChange={onDeviceNameHandler}/><br/>
                    <TextField label="시리얼" variant="standard" type="text" name="serial" value={Serial} onChange={onSerialHandler}/><br/>
                    <TextField label="주소" variant="standard" type="text" name="addr" value={Addr} onChange={onAddrHandler}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='primary' onClick={onSubmitHandler}>추가</Button>
                    <Button variant='outlined' color='primary' onClick={clickCloseHandler}>닫기</Button>
                </DialogActions>
            </Dialog>
            </Box>
           
        </div>



        // <form onSubmit = {onSubmitHandler}>
        //     <h1>고객 추가</h1>
        //     프로필 이미지: <input type="file" name="file" file={File} value={FileName} onChange={onFileHandler}/><br/>
        //     이름: <input type="text" name="userName" value={UserName} onChange={onUserNameHandler}/>
        //     생년월일: <input type="text" name="birthday" value={Birthday} onChange={onBirthdayHandler}/>
        //     성별: <input type="text" name="gender" value={Gender} onChange={onGenderHandler}/>
        //     직업: <input type="text" name="job" value={Job} onChange={onJobHandler}/>
        //     <button type="submit">추가하기</button>

        // </form>
    )
}

export default DeviceAdd;