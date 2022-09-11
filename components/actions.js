import { useDispatch } from "react-redux";
import { deleteEmployeeData } from "../store/actions";
import Button from '@mui/material/Button';
import Link from 'next/link';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function Actions({data:{...data}}){
  const [open, setOpen] = React.useState(false);
  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

    return(
        <>  
        <Button size="small" className="btn btn-primary mr-3"> <Link href={`/employee/${data.id}`}>Edit</Link></Button>
        <Button size="small" className="btn btn-danger" onClick={handleOpen} >Delete</Button>
        {open && <DeleteConfirmationModal handleClose={handleClose} open={open} data={data}/>}
        </>
    )
}


export function DeleteConfirmationModal(item){
  const {open,data,handleClose}=item;
  const dispatch= useDispatch();
  const onDelete=(id)=>{
    dispatch(deleteEmployeeData(id));
  }

  return(
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {data.firstName}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Are you sure you want to delete this employee record?
    </Typography>
    <div className="d-flex flex-row-reverse mt-11">
    <Button size="small" className="btn btn-cancel" onClick={handleClose}>Cancel</Button>
    <Button size="small" className="btn btn-danger mr-3" onClick={()=>onDelete(data.id)}>Delete</Button>
    </div>
  </Box>
</Modal>
</div>
  )
}