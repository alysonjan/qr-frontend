import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'
import QRCode from 'qrcode'
import axiosInstance from '../../helpers/axios'
import NumberFormat from 'react-number-format';

export default function AddNewStudentModal({
  open,
  setOpen,
  newStudentForm,
  setNewStudentForm,
}) {
  const { firstname, lastname, student_id, email, year, section } = newStudentForm
  const onChange = (e) =>
    setNewStudentForm({ ...newStudentForm, [e.target.name]: e.target.value })

  const [imageUrl, setImageUrl] = useState(null)

  const handleClose = () => {
    setImageUrl()
    setOpen(false)
  }

  const generateQrCode = async () => {
    try {
      console.log("TRIGGER",newStudentForm)
      const response = await QRCode.toDataURL(JSON.stringify(newStudentForm))
      setImageUrl(response)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance
        .post('/student/add', {
          student_id: student_id,
          firstname: firstname,
          lastname: lastname,
          email:email,
          section: section,
          year_level: year,
        })
        .then((res) => {
          if (res.status === 201) 
          // alert(res.data.msg)
          handleClose()
          window.location.reload(false)
        })
        // console.log({
        //   student_id: student_id,
        //   firstname: firstname,
        //   lastname: lastname,
        //   section: section,
        //   year_level: year
        // })
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Add New Student'}</DialogTitle>
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="firstname"
              label="Firstname"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="firstname"
              value={firstname}
              onChange={(e) => onChange(e)}
              required
            />
            <TextField
              id="lastname"
              label="Lastname"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="lastname"
              value={lastname}
              onChange={(e) => onChange(e)}
              required
            />
            {/* <TextField
              id="student_id"
              label="Student Number"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="student_id"
              value={student_id}
              onChange={(e) => onChange(e)}
              required
            /> */}
            <NumberFormat 
              customInput={TextField}
              format="##-####-#####"
              name="student_id"
              label="Student Number"
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              value={student_id}
              onChange={(e) => onChange(e)}
              required
              /> 
            <TextField
              id="email"
              label="Email"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="email"
              type={'email'}
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <TextField
              id="year"
              label="Year"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="year"
              value={year}
              onChange={(e) => onChange(e)}
              required
            />
            <TextField
              id="section"
              label="Section"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="section"
              value={section}
              onChange={(e) => onChange(e)}
              required
            />
            {imageUrl ? (
              <a href={imageUrl} download >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'center',
                  }}
              
                >
                  {' '}
                  <img src={imageUrl} alt="img" width={200} />
                  click me to download
                </Box>
              </a>
            ) : null}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 3 }}>
              <Button
                sx={{ backgroundColor: '#808080' }}
                size="medium"
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="button"
                size="medium"
                color="primary"
                variant="contained"
                sx={{ ml: 3 }}
                onClick={() => generateQrCode()}
              >
                Generate
              </Button>
              <Button
                type="submit"
                size="medium"
                color="success"
                variant="contained"
                sx={{ ml: 3 }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
    </div>
  )
}
