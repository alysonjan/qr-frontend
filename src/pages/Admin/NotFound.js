import { Box, Typography } from '@mui/material'

const NotFound = ({ title }) => {


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
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
            <Typography variant="h2" color='primary'>{title}</Typography>
          </Box>

        </Box>
      </Box>
    </>
  )
}

export default NotFound
