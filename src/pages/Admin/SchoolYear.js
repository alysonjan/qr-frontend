import { Button, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SchoolYearTable from '../../components/Tables/SchoolYearTable'
import { schoolYearForm } from '../../constants/constantStates'
import SchoolYearModal from '../../components/Modals/SchoolYearModal'
import axiosInstance from '../../helpers/axios'
import SubjectTable from '../../components/Tables/SubjectTable'
// import ClassModal from '../../components/Modals/ClassModal'
// import { classForm } from '../../constants/constantStates'

const SchoolYear = () => {
  const [open, setOpen] = useState(false)
  const [newSchoolYear, setNewSchoolYear] = useState(schoolYearForm)
  const [year, setYear] = useState([])
  const [yrId, setYrId] = useState('')
  const [semId, setSemId] = useState([])
  const [sem, setSem] = useState([])
  const [showTable, setShowTable] = useState(false)
  // const [openClass, setOpenClass] = useState(false)
  // const [newClass, setNewClass] = useState(classForm)

  useEffect(() => {
    if (!open) {
      setNewSchoolYear(schoolYearForm)
    }
  }, [open])

  useEffect(() => {
    const getSchoolYear = async() => {
      await axiosInstance.get('/school/year/get').then(res => {
        if (res.status === 200){
          setYear(res?.data)
        }
      })
    }
    const getSem = async() => {
      await axiosInstance.get('/semester').then(res => {
        if (res.status === 200){
          setSem(res?.data)
        }
      })
    }
    getSchoolYear()
    getSem()
  },[])

  const handleSearch = async() => {
    try {
      setShowTable(true)
    } catch (err) {
      console.error(err.message)
    }
  }


  return (
    <>
      <SchoolYearModal
        open={open}
        setOpen={setOpen}
        newSchoolYear={newSchoolYear}
        setNewSchoolYear={setNewSchoolYear}
      />
      {/* <ClassModal
        openClass={openClass}
        setOpenClass={setOpenClass}
        newClass={newClass}
        setNewClass={setNewClass}
      /> */}
      <Box
        sx={{
          width: '100%',
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
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
            <Button
              size="small"
              color='success'
              variant="contained"
              sx={{ mb: 4 }}
              onClick={() => setOpen(true)}
            >
              Add School Year
            </Button>
            {/* <Button
              size="small"
              variant="contained"
              sx={{ mb: 4 }}
              onClick={() => setOpen(true)}
            >
              Configure School Year
            </Button> */}
          </Box>
          {/* <Button
            variant="contained"
            sx={{ backgroundColor: '#6EA0EA', mb:2 }}
            size="small"
            // onClick={() => navigate(`/class/${yearId}/${rowData.sub_id}`)}
            onClick={() => setOpenClass(true)}
          >
            Add Class
          </Button> */}
          <Box sx={{ width:{ sm: 200, md: 400}, display:'flex'}}>
          
            <TextField
                id="schoolyear"
                label="School Year"
                fullWidth
                select
                defaultValue=''
                size="small"
                sx={{ mb: 2 }}
                name="schoolyear"
                value={yrId}
                onChange={(e) => setYrId(e.target.value)}
                required
              >
                {year && year.map(item => {
                  return (
                    <MenuItem value={item.sy_id}>{item.school_yr}</MenuItem>

                  )
                })}
              </TextField>
              <TextField
                id="sem"
                label="Semester"
                fullWidth
                select
                defaultValue=''
                size="small"
                sx={{ ml: 2 }}
                name="sem"
                value={semId}
                onChange={(e) => setSemId(e.target.value)}
                required
              >
                {sem && sem.map(item => {
                  return (
                    <MenuItem value={item.sem_id}>{item.semester}</MenuItem>

                  )
                })}
              </TextField>
              <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
                <Button variant='contained' size='small' color='success' sx={{ ml: 2 }} onClick={handleSearch}>search</Button>
              </Box>
          </Box>
        {showTable && showTable ? 
        <>
          <SubjectTable yearId={yrId} semId={semId} />
        </>
        :
        null
        }
          {/* <SchoolYearTable /> */}
        </Box>
      </Box>
    </>
  )
}

export default SchoolYear
