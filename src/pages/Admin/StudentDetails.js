import {  Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../helpers/axios'
import StudentSummaryTable from '../../components/Tables/StudentSummaryTable'
import NotFound from './NotFound'
import MonthlyTable from '../../components/Tables/MonthlyTable'

const StudentDetails = () => {
  const { studentID } = useParams()
  const [ data, setData ] = useState([])

  useEffect(() => {
    const getStudentDetails = async() => {
      try {
        await axiosInstance.post('/student/get-student-details',{
          student_id:studentID.toString(),
        }).then(res => {
          if (res.status === 200){
            setData(res?.data)
          }
        })
      } catch (err) {
        alert(err.message)
      }
    }
    getStudentDetails()
  },[studentID])

  return (
    <>
    {data.length === 0 ? 
      <NotFound title="Student has No Record"/>
    :
    <Box
      sx={{
        height: '80vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
      }}
    >
    <Box
      sx={{
        width: '80%',
        margin: 'auto',
      }}
    >
    {data && data?.map((dt) => {
    return (
      <div key={dt.student_id}>
        <Paper
        
          elevation={3}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            mb: 2,
            backgroundColor: '#ffffff',
          }}
        >
        
          <Typography sx={{ fontSize: '1.25rem', fontWeight:'bolder' }}>
            {dt.fullname}
          </Typography>
          <Typography sx={{ fontSize: '1.25rem', fontWeight:'bolder' }}>{dt.section}</Typography>
          <Typography sx={{ fontSize: '1.25rem', fontWeight:'bolder' }}>ID no: {dt.student_id}</Typography>
        </Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mb: 2,
              backgroundColor: '#D9D9D9',
              width: '20%',
            }}
          >
            <Typography sx={{ fontSize: '1.25rem' }}>Present: {dt.presentDays}</Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mb: 2,
              backgroundColor: '#D9D9D9',
              width: '20%',
            }}
          >
            <Typography sx={{ fontSize: '1.25rem' }}>Absent: {dt.absentDays}</Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mb: 2,
              backgroundColor: '#D9D9D9',
              width: '20%',
            }}
          >
            <Typography sx={{ fontSize: '1.25rem' }}>
              Total: {dt.totalClass}
            </Typography>
          </Paper>
        </Box>
            <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', margin:2}}>
              <StudentSummaryTable studentId= {studentID} />
              <MonthlyTable present={dt.presentDays} absent={dt.absentDays} total={dt.totalClass} />

            </Box>
        </div>
        )
      })}
      </Box>
    </Box>
    }
    </>
  )
}

export default StudentDetails
