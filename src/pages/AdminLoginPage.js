import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, Paper, Typography } from '@mui/material'
import axiosInstance from '../helpers/axios'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../context/AuthContext'

const AdminLoginPage = () => {
  let navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useContext(Auth)

  const onAdminLoginHandler = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance
        .post('/employee/login/admin', {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            // alert(res.data.msg)
            console.log(res.data)
            localStorage.setItem('fname', res?.data[0].fname)
            localStorage.setItem('lname', res?.data[0].lname)
            localStorage.setItem('role', res?.data[0].position)
            navigate('/school-year')
            if (user) return
            setUser(true)
          }
        })
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
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
      <Paper
        elevation={3}
        sx={{
          width: '40%',
          margin: 'auto',
          backgroundColor:'#ffff'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" color="#1BA4DB" sx={{ mb: 2, fontFamily: 'DM Sans' }}>
          Login as Admin
        </Typography>
        </Box>
        <form onSubmit={onAdminLoginHandler}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <Box
              sx={{
                width: { sm: 200, md: 400, lg: 700 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                id="username"
                label="Username"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                size="small"
                type="Password"
                sx={{ mb: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="info"
              >
                Login
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default AdminLoginPage
