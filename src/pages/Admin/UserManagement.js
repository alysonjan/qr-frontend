import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import UsermanagementModal from '../../components/Modals/UsermanagementModal'
import UserManagementTable from '../../components/Tables/UserManagementTable'
import { UserForm } from '../../constants/constantStates'

const UserManagement = () => {
  const [open, setOpen] = useState(false)
  const [newUserForm, setNewUserForm] = useState(UserForm)

  return (
    <>
    <UsermanagementModal
      open={open}
      setOpen={setOpen}
      newUserForm={newUserForm}
      setNewUserForm={setNewUserForm}
    />
      <Box
        sx={{
          height: '80vh',
          width: '80%',
          margin: 'auto',
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
          <Button onClick={() => setOpen(true)} variant='contained' size='medium' sx={{ mb:2 }} color='success'>Add new</Button>
          <UserManagementTable />
          {/* <Paper elevation={3} sx={{ mb:2 }}>
            <Link to='/teacher-class-details'>
            <Typography variant='h5'>Programming III</Typography>
            </Link>
          </Paper>
          <Paper elevation={3} sx={{ mb:2 }}>
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

export default UserManagement

