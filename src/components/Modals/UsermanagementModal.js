import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { MenuItem, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axiosInstance from '../../helpers/axios'
import NumberFormat from 'react-number-format'

export default function UsermanagementModal({
  open,
  setOpen,
  newUserForm,
  setNewUserForm,
}) {
  const { employee_id, firstname, lastname, username, password, position } = newUserForm
  const onChange = (e) =>
  setNewUserForm({ ...newUserForm, [e.target.name]: e.target.value })

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosInstance
        .post('/employee/admin/create/user', {
          employee_id: employee_id,
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: password,
          position: position,
        })
        .then((res) => {
          if (res.status === 201) 
          // alert(res.data.msg)
          window.location.reload(false)
        })
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
        <DialogTitle id="alert-dialog-title">{'Add New User'}</DialogTitle>
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            {/* <TextField
              id="employee_id"
              label="Employee ID"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="employee_id"
              value={employee_id}
              onChange={(e) => onChange(e)}
              required
            /> */}
            <NumberFormat
              customInput={TextField}
              format="#-###-###"
              label="Employee ID"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              required
              name="employee_id"
              value={employee_id}
              onChange={(e) => onChange(e)}
              /> 
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
            <TextField
              id="username"
              label="Username"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              required
            />
            <TextField
              id="password"
              label="Password"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              name="password"
              type='password'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            <TextField
              id="position"
              label="Position"
              fullWidth
              select
              defaultValue=''
              size="small"
              sx={{ mb: 2 }}
              name="position"
              value={position}
              onChange={(e) => onChange(e)}
              required
            >
                <MenuItem value='admin'>admin</MenuItem>
                <MenuItem value='teacher'>teacher</MenuItem>
            </TextField>
        
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
