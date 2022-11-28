import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import { TextField } from '@mui/material'
import { YearRangePicker } from 'react-year-range-picker'
import { Box } from '@mui/system'
import axiosInstance from '../../helpers/axios'
import { useState } from 'react'

export default function SchoolYearModal({
  open,
  setOpen
}) {
  // const { school_year } = newSchoolYear
  // const onChange = (e) =>
  //   setNewSchoolYear({ ...newSchoolYear, [e.target.name]: e.target.value })
  const [yearRange, setYearRange] = useState()

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let start = yearRange?.startYear
    let end = yearRange?.endYear
    let schoolYearRange = start+'-'+end
    try {
      await axiosInstance
        .post('/school/year/add', {
          school_year: schoolYearRange && schoolYearRange,
        })
        .then((res) => {
          if (res.status === 201) 
          // alert(res.data.msg)
          handleClose()
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
        fullWidth={true}
        maxWidth={'sm'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Add New School Year'}
        </DialogTitle>
        <Box sx={{ p: 2 }} >
          <form onSubmit={handleSubmit}>
            <YearRangePicker
              minYear={new Date().getFullYear() - 20}
              maxYear={new Date().getFullYear() + 20}
              onSelect={(startYear,endYear) => {
                setYearRange({ startYear, endYear })
              }}
              startYear={yearRange?.startYear}
              endYear={yearRange?.endYear}
            />

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
