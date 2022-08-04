import React,{useState} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';

function DeviceDelete({seq, stateRefresh}){

    const [open,setOpen] = useState(false);
    
    const deleteDevice = (seq) => {
        //console.log("지우기"+props.seq);
        const url = '/api/device/' + seq;
        fetch(url, {
            method: 'DELETE'
        }).then(
            stateRefresh(),
            clickCloseHandler()
        );
        
    }

    const clickOpenHandler = (e) =>{
        setOpen(true);
    }

    const clickCloseHandler = (e) =>{
        setOpen(false);
    }


    return(
        <div>
        <Button variant="contained" color="secondary" onClick={clickOpenHandler}>삭제</Button>
        <Dialog open={open} onClose={clickCloseHandler}>
            <DialogTitle onClose={clickCloseHandler}>
                삭제 경고
            </DialogTitle>
            <DialogContent>
                <Typography>
                    선택한 장비 정보가 삭제됩니다.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={(e) => {deleteDevice(seq)}}>삭제</Button>
                <Button variant="outlined" color="primary" onClick={clickCloseHandler}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}

export default DeviceDelete;