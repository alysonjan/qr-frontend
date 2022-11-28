import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ClassTable from '../../components/Tables/ClassTable'
import { useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../helpers/axios'

const TeacherClassDetails = () => {
  let navigate = useNavigate()
  const { classId } = useParams()
  const handleCreateSession = async() => {
    try {
      await axiosInstance.post('/session/create',{
        user_id:localStorage.getItem('id'),
        class_id:classId
      }).then(res =>{
        if(res.status === 201) {
          navigate(`/create-session/${classId}`)
        }
      })
    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <>
      <Box
        sx={{
          height: '80vh',
          width: '80%',
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
      
        <Box
          sx={{
            width: '80%',
            margin: 'auto',
          }}
        >

        {/* <Typography variant='h4'>SSP 009: Student Success Program</Typography> */}
          <Button sx={{ float:'right', m:2}} size='small' variant='contained' onClick={()=> handleCreateSession() }>Start Class</Button>
          <ClassTable classId={classId}/>
        </Box>
      </Box>
    </>
  )
}

export default TeacherClassDetails
