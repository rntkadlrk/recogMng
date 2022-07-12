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



function CustomerAdd(){

    const [File, setFile] = useState('');
    const [UserName, setUserName] = useState('');
    const [Birthday, setBirthday] = useState('');
    const [Gender, setGender] = useState('');
    const [Job, setJob] = useState(''); 
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
    const onBirthdayHandler = (e) =>{
        setBirthday(e.currentTarget.value)
    }
    const onGenderHandler = (e) =>{
        setGender(e.currentTarget.value)
    }
    const onJobHandler = (e) =>{
        setJob(e.currentTarget.value)
    }
  

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        addCustomer()
        .then((response) => {
            console.log(response.data);
        })
        setFile('');
        setUserName('');
        setBirthday('');
        setGender('');
        setJob('');
        setFileName('');
        
        window.location.reload();
    }

    const clickOpenHandler = (e) =>{
        setOpen(true);
    }

    const clickCloseHandler = (e) =>{
        setFile('');
        setUserName('');
        setBirthday('');
        setGender('');
        setJob('');
        setFileName('');
        setOpen(false);
    }






    const addCustomer = ()=>{
        const url = '/api/test';
        const formData = new FormData();
        formData.append('image',File)
        formData.append('name', UserName);
        formData.append('birthday', Birthday);
        formData.append('gender', Gender);
        formData.append('job', Job);
        const config={
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }
    return (

        <div>
         
            <Button variant='contained' color='primary' onClick={clickOpenHandler}>
                사용자 추가하기
            </Button>
            <Box 
            sx ={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

            <Dialog open={open} onClose={clickCloseHandler}>
                <DialogTitle>사용자 추가</DialogTitle>
                <DialogContent>
                    <input className="hidden" type="file" accept="image/*" id="raised-button-file" file={File} value={FileName} onChange={onFileHandler}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {FileName === "" ?"프로필 이미지 선택" : FileName}
                        </Button>
                    </label>
                    <br/><br/>
                    <TextField required label="이름" type="text" name="userName" value={UserName} onChange={onUserNameHandler}/><br/>
                    <TextField type="date" name="birthday" value={Birthday} onChange={onBirthdayHandler}/><br/>
                    <TextField label="성별" type="text" name="gender" value={Gender} onChange={onGenderHandler}/><br/>
                    <TextField label="직업" type="text" name="job" value={Job} onChange={onJobHandler}/><br/>
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

export default CustomerAdd;