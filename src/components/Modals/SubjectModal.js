import { Box, Button, Dialog, DialogTitle, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import axiosInstance from '../../helpers/axios';

const SubjectModal = ({ open,setOpen}) => {
const [semester, setSemester] = useState('');
const [subjectCode, setSubjectCode] = useState('');
const [subjectDescription, setSubjectDescription] = useState('');
const handleClose = () => {
    setOpen(false)
    setSemester('')
    setSubjectCode('')
    setSubjectDescription('')
  }
const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        await axiosInstance.post('/subject/add',{
            sem_id:semester,
            subject_name:subjectCode,
            subject_description:subjectDescription
        }).then(res => {
            if(res.status === 201){
                // alert(res?.data.msg)
                window.location.reload(false)
            }
        })
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
    <DialogTitle id="alert-dialog-title">{'Add New Subject'}</DialogTitle>
    <Box sx={{ p: 2 }}>
    <form onSubmit={handleSubmit}>
        <TextField
            id="semester"
            select
            label="Semester"
            onChange={(e) => setSemester(e.target.value)}
            value={semester}
            name="semester"
            defaultValue=""
            fullWidth
            sx={{ mb: 2 }}
            size="small"
        >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={4}>summer</MenuItem>
        </TextField>
        <TextField
        id="subject code"
        label="Subject Code"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        name="subjectCode"
        value={subjectCode}
        onChange={(e) => setSubjectCode(e.target.value)}
        required
        />
        <TextField
        id="subjectDescription"
        label="Subject Description"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        name="subjectDescription"
        value={subjectDescription}
        onChange={(e) => setSubjectDescription(e.target.value)}
        required
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

export default SubjectModal
