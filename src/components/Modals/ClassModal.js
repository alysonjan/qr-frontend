import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import * as XLSX from 'xlsx'

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Paper,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import axiosInstance from '../../helpers/axios'
import { useEffect, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'

export default function ClassModal({
  openClass,
  setOpenClass,
  newClass,
  setNewClass,
  yrID
}) {
  const [teacher, setTeacher] = useState([])
  const [studentList, setStudentList] = useState([])
  const [subjectList, setSubjectList] = useState([])
  const [studentID, setStudentID] = useState([])

  const [startTime1, setStartTime1] = useState(new Date())
  const [endTime1, setEndTime1] = useState(new Date())
  var newStartTime1 = startTime1
  var newEndTime1 = endTime1

  const [startTime2, setStartTime2] = useState(new Date())
  const [endTime2, setEndTime2] = useState(new Date())
  var newStartTime2 = startTime2
  var newEndTime2 = endTime2

  const [startTime3, setStartTime3] = useState(new Date())
  const [endTime3, setEndTime3] = useState(new Date())
  var newStartTime3 = startTime3
  var newEndTime3 = endTime3

  const [startTime4, setStartTime4] = useState(new Date())
  const [endTime4, setEndTime4] = useState(new Date())
  var newStartTime4 = startTime4
  var newEndTime4 = endTime4

  const [startTime5, setStartTime5] = useState(new Date())
  const [endTime5, setEndTime5] = useState(new Date())
  var newStartTime5 = startTime5
  var newEndTime5 = endTime5

  const [startTime6, setStartTime6] = useState(new Date())
  const [endTime6, setEndTime6] = useState(new Date())
  var newStartTime6 = startTime6
  var newEndTime6 = endTime6

  const [excelFile, setExcelFile]=useState(null);
  const [excelFileError, setExcelFileError]=useState(null);  
  const [excelData, setExcelData]=useState(null);

    // handle File
    const fileType=['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const handleFile = (e)=>{
      let selectedFile = e.target.files[0];
      if(selectedFile){
        // console.log(selectedFile.type);
        if(selectedFile&&fileType.includes(selectedFile.type)){
          let reader = new FileReader();
          reader.readAsArrayBuffer(selectedFile);
          reader.onload=(e)=>{
            setExcelFileError(null);
            setExcelFile(e.target.result);
          } 
        }
        else{
          setExcelFileError('Please select only excel file types');
          setExcelFile(null);
        }
      }
      else{
        console.log('plz select your file');
      }
    }
  // submit function
  const handleSubmitExcel= async(e)=>{
    e.preventDefault();
    if(excelFile !== null){
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);

    }
    else{
      setExcelData(null);
    }
  }

  const { section, sub_id, employee_id, day1, day2, day3, day4, day5, day6  } = newClass
  const onChange = (e) =>
    setNewClass({ ...newClass, [e.target.name]: e.target.value })

  const handleClose = () => {
    setOpenClass(false)
  }
  // ######################################TIME##########################
  const handleChangeStartTime1 = (newValue) => {
    setStartTime1(newValue)
  }
  const handleChangeEndTime1 = (newValue) => {
    setEndTime1(newValue)
  }
  const handleChangeStartTime2 = (newValue) => {
    setStartTime2(newValue)
  }
  const handleChangeEndTime2 = (newValue) => {
    setEndTime2(newValue)
  }
  const handleChangeStartTime3 = (newValue) => {
    setStartTime3(newValue)
  }
  const handleChangeEndTime3 = (newValue) => {
    setEndTime3(newValue)
  }
  const handleChangeStartTime4 = (newValue) => {
    setStartTime4(newValue)
  }
  const handleChangeEndTime4 = (newValue) => {
    setEndTime4(newValue)
  }

  const handleChangeStartTime5 = (newValue) => {
    setStartTime5(newValue)
  }
  const handleChangeEndTime5 = (newValue) => {
    setEndTime5(newValue)
  }

  const handleChangeStartTime6 = (newValue) => {
    setStartTime6(newValue)
  }
  const handleChangeEndTime6 = (newValue) => {
    setEndTime6(newValue)
  }
  // ######################################TIME##########################
  useEffect(() => {
    const getTeacher = async () => {
      try {
        await axiosInstance.get('/employee/get/teacher').then((res) => {
          if (res.status === 200) {
            setTeacher(res?.data)
          }
        })
      } catch (err) {
        alert(err.message)
      }
    }
    const getStudent = async () => {
      try {
        await axiosInstance.get('/student/get').then((res) => {
          if (res.status === 200) {
            setStudentList(res?.data)
          }
        })
      } catch (err) {
        alert(err.message)
      }
    }
    const getSubject = async () => {
      try {
        await axiosInstance.get('/subject/get').then((res) => {
          if (res.status === 200) {
            setSubjectList(res?.data)
          }
        })
      } catch (err) {
        alert(err.message)
      }
    }
    getTeacher()
    getStudent()
    getSubject()
  }, [])

  const subjectName = subjectList.find((subj) => sub_id === subj.sub_id)

  const handleStudentIdChange = (e) => {
    const index = studentID.indexOf(e.target.value)
    if (index === -1) {
      setStudentID([...studentID, e.target.value])
    } else {
      setStudentID(studentID.filter((ids) => ids !== e.target.value))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (!excelData?.length){
        const newObj = [
          {
            day: day1,
            start_time: newStartTime1,
            end_time: newEndTime1,
          },
          {
            day: day2,
            start_time: newStartTime2,
            end_time: newEndTime2,
          },
          {
            day: day3,
            start_time: newStartTime3,
            end_time: newEndTime3,
          },
          {
            day: day4,
            start_time: newStartTime4,
            end_time: newEndTime4,
          },
          {
            day: day5,
            start_time: newStartTime5,
            end_time: newEndTime5,
          },
          {
            day: day6,
            start_time: newStartTime6,
            end_time: newEndTime6,
          },
        ]
  
        await axiosInstance
          .post('/class/add', {
            sy_id: parseInt(yrID),
            sub_id: sub_id,
            section:section,
            employee_id: parseInt(employee_id),
            student_id: studentID,
            schedule: newObj,
          })
          .then((res) => {
            if (res.status === 201) alert('Successfully added')
            handleClose()
            window.location.reload(false)
          })

        // console.log({
        //     sy_id: parseInt(yrID),
        //     sub_id: sub_id,
        //     section:section,
        //     employee_id: parseInt(employee_id),
        //     student_id: studentID,
        //     // schedule: newObj,
        // })

    
      } else {
        let excelDataStudentIds = excelData?.map(st => st.Student_ID) 
        // console.log(excelDataStudentIds)
        var mergeIds = studentID.concat(excelDataStudentIds)
        let uniqueIds = [...new Set(mergeIds)]
  
        // console.log('Unique',uniqueIds)
        // console.log('FCKStudent',studentList)
        const filterStudentNotIntheList = excelData.filter(res1 => studentList.every(res2 => res2.student_id !== res1.Student_ID));
        filterStudentNotIntheList && filterStudentNotIntheList?.forEach(async(val) => {
          await axiosInstance.post('/student/add',{
            student_id:val.Student_ID,
            firstname:val.Firstname,
            lastname:val.Lastname,
            section:val.Section,
            year_level:val.Year
          }).then(res => {
            if (res.status === 201){
              console(res?.data.msg)
            }
          })
        });
  
  
        const newObj = [
          {
            day: day1,
            start_time: newStartTime1,
            end_time: newEndTime1,
          },
          {
            day: day2,
            start_time: newStartTime2,
            end_time: newEndTime2,
          },
          {
            day: day3,
            start_time: newStartTime3,
            end_time: newEndTime3,
          },
          {
            day: day4,
            start_time: newStartTime4,
            end_time: newEndTime4,
          },
          {
            day: day5,
            start_time: newStartTime5,
            end_time: newEndTime5,
          },
          {
            day: day6,
            start_time: newStartTime6,
            end_time: newEndTime6,
          },
        ]
  
        await axiosInstance
          .post('/class/add', {
            sy_id: parseInt(yrID),
            sub_id: sub_id,
            employee_id: parseInt(employee_id),
            student_id: uniqueIds,
            schedule: newObj,
            section: section,
          })
          .then((res) => {
            if (res.status === 201) alert('Successfully added')
            handleClose()
            window.location.reload(false)
          })

          // console.log({
          //   sy_id: parseInt(yrID),
          //   sub_id: sub_id,
          //   employee_id: parseInt(employee_id),
          //   student_id: uniqueIds,
          //   schedule: newObj,
          // })
          // .then((res) => {
          //   if (res.status === 201) alert('Successfully added')
          //   handleClose()
          //   window.location.reload(false)
          // })
      }
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog
          maxWidth='md'
          open={openClass}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Add Class'}</DialogTitle>
          <Box sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '60%' }}>
                  <TextField
                    id="outlined-textarea"
                    label="Subject Code"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    defaultValue=""
                    disabled
                    size="small"
                    sx={{ mb: 2 }}
                    value={subjectName && subjectName.sub_name}
                    name="subject_code"
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <TextField
                    id="Subject Description"
                    select
                    label="Subject Description"
                    defaultValue=""
                    onChange={(e) => onChange(e)}
                    value={sub_id}
                    name="sub_id"
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                  >
                    {subjectList &&
                      subjectList.map((item) => {
                        return (
                          <MenuItem key={item.sub_id} value={item.sub_id}>
                            {item.sub_desc}
                          </MenuItem>
                        )
                      })}
                  </TextField>
                  <TextField
                    id="teacher"
                    select
                    label="Teacher"
                    onChange={(e) => onChange(e)}
                    value={employee_id}
                    name="employee_id"
                    defaultValue=""
                    fullWidth
                    sx={{ mb: 2 }}
                    size="small"
                  >
                    {teacher &&
                      teacher.map((item) => {
                        return (
                          <MenuItem key={item.user_id} value={item.user_id}>
                            {item.fname + ' ' + item.lname}
                          </MenuItem>
                        )
                      })}
                  </TextField>
                  <TextField
                    id="outlined-textarea"
                    label="Section"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    defaultValue=""
                    size="small"
                    sx={{ mb: 2 }}
                    // value={subjectName && subjectName.sub_name}
                    name="section"
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <Box sx={{ display: 'flex' }}>
                    <TextField
                      id="Days"
                      select
                      label="Day"
                      onChange={(e) => onChange(e)}
                      value={day1}
                      name="day1"
                      defaultValue=""
                      fullWidth
                      sx={{ m: 1 }}
                      size="small"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                    </TextField>
                    <TimePicker
                      label="Start time"
                      value={startTime1}
                      onChange={handleChangeStartTime1}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                    <TimePicker
                      label="End time"
                      value={endTime1}
                      onChange={handleChangeEndTime1}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                  </Box>
                  

                  <Box sx={{ display: 'flex' }}>
                    <TextField
                      id="Days"
                      select
                      label="Day"
                      disabled={day1 === '' ? true : undefined}
                      onChange={(e) => onChange(e)}
                      value={day2}
                      name="day2"
                      defaultValue=""
                      fullWidth
                      sx={{ m: 1 }}
                      size="small"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                    </TextField>
                    <TimePicker
                      label="Start time"
                      value={startTime2}
                      onChange={handleChangeStartTime2}
                      disabled={day2 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                    <TimePicker
                      label="End time"
                      value={endTime2}
                      onChange={handleChangeEndTime2}
                      disabled={day2 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                  </Box>

                  <Box sx={{ display: 'flex' }}>
                    <TextField
                      id="Days"
                      select
                      label="Day"
                      disabled={day2 === '' ? true : undefined}
                      onChange={(e) => onChange(e)}
                      value={day3}
                      name="day3"
                      defaultValue=""
                      fullWidth
                      sx={{ m: 1 }}
                      size="small"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                    </TextField>
                    <TimePicker
                      label="Start time"
                      value={startTime3}
                      onChange={handleChangeStartTime3}
                      disabled={day3 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                    <TimePicker
                      label="End time"
                      value={endTime3}
                      onChange={handleChangeEndTime3}
                      disabled={day3 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                  </Box>

                  {/* DAY 4         */}
                  <Box sx={{ display: 'flex' }}>
                    <TextField
                      id="Days"
                      select
                      label="Day"
                      disabled={day3 === '' ? true : undefined}
                      onChange={(e) => onChange(e)}
                      value={day4}
                      name="day4"
                      defaultValue=""
                      fullWidth
                      sx={{ m: 1 }}
                      size="small"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                    </TextField>
                    <TimePicker
                      label="Start time"
                      value={startTime4}
                      onChange={handleChangeStartTime4}
                      disabled={day3 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                    <TimePicker
                      label="End time"
                      value={endTime4}
                      onChange={handleChangeEndTime4}
                      disabled={day3 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                  </Box>

                   {/* DAY 5         */}
                  <Box sx={{ display: 'flex' }}>
                    <TextField
                      id="Days"
                      select
                      label="Day"
                      disabled={day4 === '' ? true : undefined}
                      onChange={(e) => onChange(e)}
                      value={day5}
                      name="day5"
                      defaultValue=""
                      fullWidth
                      sx={{ m: 1 }}
                      size="small"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                    </TextField>
                    <TimePicker
                      label="Start time"
                      value={startTime5}
                      onChange={handleChangeStartTime5}
                      disabled={day4 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                    <TimePicker
                      label="End time"
                      value={endTime5}
                      onChange={handleChangeEndTime5}
                      disabled={day4 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                  </Box>
                   {/* DAY 6         */}
                  <Box sx={{ display: 'flex' }}>
                    <TextField
                      id="Days"
                      select
                      label="Day"
                      disabled={day5 === '' ? true : undefined}
                      onChange={(e) => onChange(e)}
                      value={day6}
                      name="day6"
                      defaultValue=""
                      fullWidth
                      sx={{ m: 1 }}
                      size="small"
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                    </TextField>
                    <TimePicker
                      label="Start time"
                      value={startTime6}
                      onChange={handleChangeStartTime6}
                      disabled={day5 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                    <TimePicker
                      label="End time"
                      value={endTime6}
                      onChange={handleChangeEndTime6}
                      disabled={day5 === '' ? true : undefined}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          fullWidth
                          sx={{ m: 1 }}
                          {...params}
                        />
                      )}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: '50%',
                    p: 2,
                    m: 1,
                    position: 'relative',
                    top: -40,
                  }}
                >
                  <label><h5>Upload Excel file</h5></label>
                  <input type='file' className='form-control'
                  onChange={handleFile} ></input>                  
                  {excelFileError&&<div className='text-danger'
                  style={{marginTop:'2px'}}>{excelFileError}</div>}
                  <button type='submit' className='btn btn-success'
                  style={{marginTop:5+'px'}} onClick={handleSubmitExcel}>Import</button>
                  <Paper
                    elevation={2}
                    sx={{ mt:2, p: 1, height: '300px', overflow: 'auto' }}
                  >
                    <Box>
                      {studentList &&
                        studentList?.map((item) => {
                          return (
                            <Box key={item.student_id}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      size="small"
                                      value={item.student_id}
                                      checked={studentID.includes(
                                        item.student_id
                                      )}
                                      onChange={handleStudentIdChange}
                                    />
                                  }
                                  label={item.fullname}
                                />
                              </FormGroup>
                            </Box>
                          )
                        })}
                    </Box>
                  </Paper>
                </Box>
              </Box>
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
      </LocalizationProvider>
    </>
  )
}
