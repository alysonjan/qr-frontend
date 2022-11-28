import { Button,  Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import SessionTable from '../../components/Tables/SessionTable'
import axiosInstance from '../../helpers/axios'

const CreateSession = () => {
  const [data, setData ] = useState([])
  const { classId } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    const getSession = async() => {
    try {
      await axiosInstance.post('/session/get',{ user_id: parseInt(localStorage.getItem('id'))}).then(res => {
        if (res.status === 200){
          setData(res?.data[0])
        }
      })
    } catch (err) {
      alert(err.message)
    }
    }

    const interval=setInterval(()=>{
        getSession()
    },60000)

      return()=>clearInterval(interval)
  },[])


  const handleCloseSession = async(id) => {
    try {
      await axiosInstance.post('/attendance/update-absent',{ 
        classID:classId
      }).then(res=> {
        if(res.status === 200){
          console.log('session is closed')
        }
      })
      await axiosInstance.post('/session/close',{
        session_id: id
      }).then(res => {
        if(res.status === 200) {
          // alert(res?.data)
          navigate('/teacher-homepage')
        }
      })
    } catch (err) {
      alert(err.response.data.msg)
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
          <Typography variant='subtitle'>Date: {data && data?.date_created} Time: {data && data?.time_created}</Typography>
          <Button sx={{ float:'right', m:2}} size='small' color='error' variant='contained' onClick={()=> handleCloseSession(data?.session_id)}>End Class</Button>
          <SessionTable classId={classId} sessionId={data && data?.session_id}/>
          <Button variant='outlined' color='warning' size='medium' sx={{mt:3, float:'right'}}>
            <a sx={{ m:2}}  href='http://localhost:3001/' target="_blank" rel="noopener noreferrer"><span style={{ fontSize:'15px', fontWeight:'bolder'}}> Scan here</span></a><br/>
          </Button>
        

        </Box>
      </Box>
    </>
  )
}

export default CreateSession
