import React from 'react';

function CustomerDelete(props){

    const deleteCustomer = (props) => {
        console.log("지우기"+props.seq);
        const url = '/api/customers/' + props.seq;
        fetch(url, {
            method: 'DELETE'
        }).then(
            window.location.reload()
        );
        
       // 
    }

    return(
        <button onClick={(e) => {deleteCustomer(props)}}>삭제</button>
    )
}

export default CustomerDelete;