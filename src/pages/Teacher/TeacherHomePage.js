import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../helpers/axios'

const TeacherHomePage = () => {
  const [data, setData] = useState([])
  const id = localStorage.getItem('id')
  useEffect(() => {
    const getSubjectByTeacher = async() => {
      try {
        await axiosInstance.post('/subject/get-all-subjects-by-teacher', {
          teacherId:id
        }).then(res => {
          if (res.status === 200) {
            setData(res?.data)
          }
        })
      } catch (err) {
        console.error(err.message)
      }
    }
    getSubjectByTeacher()
  },[id])
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
          marginTop: 1,
        }}
      >
        <Box
          sx={{
            width: '80%',
            margin: 'auto',
          }}
        >
          {data && data.map(item => {
            return (
              <Paper key={item.sub_id} elevation={3} sx={{ mb:2 }}>
              <Link to={`/teacher-class-details/${item.class_id}`}>
              <Typography variant='h5'>{item.sub_desc}</Typography>
              </Link>
            </Paper>
            )
          })}
        
          {/* <Paper elevation={3} sx={{ mb:2 }}>
            <Typography variant='h5'>SSP 1</Typography>
          </Paper>
          <Paper elevation={3} sx={{ mb:2 }}>
            <Typography variant='h5'>New Venture
            </Typography>
          </Paper> */}
        </Box>
      </Box>
    </>
  )
}

export default TeacherHomePage
