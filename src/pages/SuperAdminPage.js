import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button, MenuItem, Paper, Typography } from '@mui/material'
import axiosInstance from '../helpers/axios'
import { Auth } from '../context/AuthContext'
import NumberFormat from 'react-number-format';

const SuperAdminPage = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [position, setPosition] = useState('');
  const { user, setUser } = useContext(Auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (password === confirmPassword){
        await axiosInstance
        .post('/employee/admin/create/user', {
          employee_id:employeeID,
          firstname:firstname,
          lastname:lastname,
          username:username,
          password:password,
          position:position
        })
        .then((res) => {
          if (res.status === 201) {
            // alert(res.data.msg)
            localStorage.setItem('role', position)
            alert(res?.data.msg)
            window.location.reload(false)
            // if (user) return
            // setUser(true)
            
          }
        })
      }else{
        alert("Password doesn't match")
      }
    } catch (err) {
      alert(err.response.data.message)
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
        background: 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 40%, rgba(0,212,255,1) 100%)',
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
          Create User
        </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <Box
              sx={{
                width: { sm: 200, md: 400, lg: 700 },
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* <TextField
                id="employeeid"
                label="Employee ID"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                required
                value={employeeID}
                onChange={(e) => setEmployeeID(e.target.value)}
              /> */}
              <NumberFormat 
              customInput={TextField}
              format="#-###-###"
              name="employeeid"
              label="Employee ID"
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
              value={employeeID}
              /> 
              <TextField
                id="firstname"
                label="Firstname"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <TextField
                id="lastname"
                label="Lastname"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
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
              <TextField
                id="confirm password"
                label="Confirm Password"
                variant="outlined"
                size="small"
                type="Password"
                sx={{ mb: 2 }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <TextField
                id="position"
                label="Role"
                variant="outlined"
                size="small"
                select
                defaultValue=''
                sx={{ mb: 2 }}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='teacher'>Teacher</MenuItem>
              </TextField>
              <Button
                type="submit"
                size="medium"
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}

export default SuperAdminPage
