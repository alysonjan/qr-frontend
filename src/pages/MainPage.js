import { Button, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  let navigate = useNavigate()
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#1BA4DB'
      }}
    >

      <Box
        sx={{
          width: '50%',
          margin: 'auto',
          textAlign:'center',
          backgroundColor:'#1BA4DB'
        }}
      >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" color="#ffff" sx={{ mb: 2, fontFamily: 'DM Sans' }}>
          SWU CITE QR Attendance Monitoring System
        </Typography>
      </Box>
      <img src="logobob.png" alt="bob" width="500" height="400"></img>         

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        </Box>
        <form>
          <Box sx={{ display: 'flex', justifyContent: 'center', m: 4 }}>
            <Box
              sx={{
                width: { sm: 200, md: 400, lg: 700 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6"  color="#ffff" sx={{ mb: 1, fontFamily: 'DM Sans' }}>
                  Login as
                </Typography>

                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="warning"
                  sx={{ mb: 2, width: '50%' }}
                  onClick={() => navigate('/login-admin')}
                >
                  ADMIN
                </Button>

                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mb: 2, width: '50%' }}
                  onClick={() => navigate('/login-teacher')}
                >
                  TEACHER
                </Button>
              </Box>
            </Box>
          </Box>
          <Typography variant='overline' sx={{ color:'#ffff'}}>All Rights Reserved Copyright &copy; Urgello Boys</Typography>
        </form>
      </Box>
    </Box>
  )
}

export default MainPage
