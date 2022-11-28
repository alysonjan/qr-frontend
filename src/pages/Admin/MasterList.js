import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import MasterListTable from '../../components/Tables/GeneralMasterlistTable'
import AddNewStudentModal from '../../components/Modals/MasterListModal'
import NewStudentFormInitialData from '../../constants/NewStudentFormInitialData'

const MasterList = () => {
  const [open, setOpen] = useState(false)
  const [newStudentForm, setNewStudentForm] = useState(
    NewStudentFormInitialData
  )

  useEffect(() => {
    if (!open) {
      setNewStudentForm(NewStudentFormInitialData)
    }
  }, [open])

  return (
    <>
      <AddNewStudentModal
        open={open}
        setOpen={setOpen}
        newStudentForm={newStudentForm}
        setNewStudentForm={setNewStudentForm}
      />

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">General Masterlist </Typography>
            {/* <TextField
              id="sem"
              select
              label="Semester"
              sx={{ width: '20%' }}
              size="small"
            >
              <MenuItem value="0">Choose Semester</MenuItem>
              <MenuItem value="first">1st Semester</MenuItem>
              <MenuItem value="second">2nd Semester</MenuItem>
              <MenuItem value="summer">Summer</MenuItem>
            </TextField> */}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
            <Button
              size="medium"
              variant="contained"
              color='success'
              onClick={() => setOpen(true)}
            >
              Add New
            </Button>
          </Box>
          <MasterListTable />
        </Box>
      </Box>
    </>
  )
}

export default MasterList
