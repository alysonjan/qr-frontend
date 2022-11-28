import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import HistoryTable from '../../components/Tables/HistoryTable'
import axiosInstance from '../../helpers/axios'

const TeacherHistory = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getHistory = async() => {
      await axiosInstance.post('/session/history',{
        user_id:localStorage.getItem('id')
      }).then(res => {
        if(res.status === 200){
          setData(res?.data)
        }
      })  
    }
    getHistory()
  },[])
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
          <HistoryTable data={data && data}/>
        </Box>
      </Box>
    </>
  )
}

export default TeacherHistory
