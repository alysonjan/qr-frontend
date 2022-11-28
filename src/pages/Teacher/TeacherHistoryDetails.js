import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import HistoryDetailsTable from '../../components/Tables/HistoryDetailsTable'
import axiosInstance from '../../helpers/axios'
import { useParams } from 'react-router-dom'

const TeacherHistoryDetails = () => {
  const { date } = useParams()
  const [data, setData] = useState([])
  useEffect(() => {
    const getHistory = async() => {
      await axiosInstance.post('/session/history-details',{
        date:date
      }).then(res => {
        if(res.status === 200){
          setData(res?.data)
        }
      })  
    }
    getHistory()
  },[date])
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
          <Typography>HISTORY SUBJECT DETAILS {date} </Typography>
          <HistoryDetailsTable data={data && data}/>
        </Box>
      </Box>
    </>
  )
}

export default TeacherHistoryDetails