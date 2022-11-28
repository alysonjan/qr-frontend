import { Box, Button } from '@mui/material'
import ClassTable from '../../components/Tables/ClassTable'
import { useParams } from 'react-router-dom'

const Class = () => {
  let { classID } = useParams()
  return (
    <>
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => alert('under maintenance')}
            >
              Edit
            </Button>
          </Box>

          <ClassTable classId={classID} />
        </Box>
      </Box>
    </>
  )
}

export default Class
