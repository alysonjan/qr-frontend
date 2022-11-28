import { Box, Button, Dialog, DialogTitle, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axiosInstance from '../../helpers/axios';

const UpdatePasswordModal = ({ open,setOpen, userID}) => {
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const handleClose = () => {
    setOpen(false)
    setNewPassword('')
    setConfirmPassword('')
  }
const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        if( newPassword !== confirmPassword){
            alert("Password doesn't match!")
        }else{
            await axiosInstance.post('/employee/user/update/password',{
                user_id:userID && userID,
                new_password:newPassword
            }).then(res => {
                if(res.status === 200){
                    alert(res?.data)
                    window.location.reload(false)
                }
            })
        }
    } catch (err) {
        console.error(err.message)
    }
}

return (
    <div>
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{'Update Password'}</DialogTitle>
    <Box sx={{ p: 2 }}>
    <form onSubmit={handleSubmit}>
        <TextField
            id="new password"
            label="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            name="new password"
            type='password'
            fullWidth
            sx={{ mb: 2 }}
            size="small"
        />

        <TextField
            id="confirm password"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            name="confirm password"
            type='password'
            fullWidth
            sx={{ mb: 2 }}
            size="small"
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 3 }}>
        <Button
            sx={{ backgroundColor: '#808080' }}
            size="medium"
            variant="contained"
            onClick={handleClose}
        >
            Cancel
        </Button>
        <Button
            type="submit"
            size="medium"
            color="success"
            variant="contained"
            sx={{ ml: 3 }}
        >
            Submit
        </Button>
        </Box>
    </form>
    </Box>
    </Dialog>
    </div>
)
}

export default UpdatePasswordModal
