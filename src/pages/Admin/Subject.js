import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ClassModal from '../../components/Modals/ClassModal'
import SubjectTable from '../../components/Tables/SubjectTable'
import { classForm } from '../../constants/constantStates'

const Subject = () => {
  let { year, yearID } = useParams()
  const [openClass, setOpenClass] = useState(false)
  const [newClass, setNewClass] = useState(classForm)

  useEffect(() => {
    if (!openClass) {
      setNewClass(newClass)
    }
  }, [openClass, newClass])
  return (
    <>
      <ClassModal
        openClass={openClass}
        setOpenClass={setOpenClass}
        newClass={newClass}
        setNewClass={setNewClass}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4">School Year {year && year}</Typography>
            {/* <Button
              variant="contained"
              sx={{ backgroundColor: '#6EA0EA' }}
              size="small"
              // onClick={() => navigate(`/class/${yearId}/${rowData.sub_id}`)}
              onClick={() => setOpenClass(true)}
            > 
              Add Class
            </Button> */}
          </Box>
          <SubjectTable yearId={yearID} />
        </Box>
      </Box>
    </>
  )
}

export default Subject
