import React, { useState, useEffect } from 'react'
import { Backdrop, Box, Button, CircularProgress, Typography } from '@mui/material'
import MasterListTable from '../../components/Tables/GeneralMasterlistTable'
import AddNewStudentModal from '../../components/Modals/MasterListModal'
import NewStudentFormInitialData from '../../constants/NewStudentFormInitialData'
import * as XLSX from 'xlsx'
import axiosInstance from '../../helpers/axios'


const MasterList = () => {
  const [open, setOpen] = useState(false)
  const [studentList, setStudentList] = useState([])
  const [loading, setLoading] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState(
    NewStudentFormInitialData
  )

  useEffect(() => {
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
    getStudent()
  }, [])

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
      setLoading(true)
      const workbook = XLSX.read(excelFile,{type:'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      // setExcelData(data);

      // let excelDataStudentIds = data?.map(st => st.Student_ID) 
      // console.log(excelDataStudentIds)
      // var mergeIds = studentID.concat(excelDataStudentIds)
      // let uniqueIds = [...new Set(mergeIds)]

      const filterStudentNotIntheList = data.filter(res1 => studentList.every(res2 => res2.student_id !== res1.Student_ID));
      filterStudentNotIntheList && filterStudentNotIntheList?.forEach(async(val) => {
        await axiosInstance.post('/student/add',{
          student_id:val.Student_ID,
          firstname:val.Firstname,
          lastname:val.Lastname,
          section:val.Section,
          year_level:val.Year,
          email:val.Email
        }).then(res => {
          if (res.status === 201){
            setTimeout(() => {
              setLoading(false)
            }, 5000);
            console.log('new students successfully added')

          }
        })

      });
    }
    else{
      setLoading(false)
      alert('Please Select File')
    }
  }



  useEffect(() => {
    if (!open) {
      setNewStudentForm(NewStudentFormInitialData)
    }
  }, [open])

  return (
    <>
    { loading ? <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </Backdrop> : 
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
          <Box>
            <label><h5>Upload Excel file</h5></label>
            <input type='file' className='form-control'
            onChange={handleFile} ></input>                  
            {excelFileError&&<div className='text-danger'
            style={{marginTop:'2px'}}>{excelFileError}</div>}
            <button type='submit' className='btn btn-success' style={{marginTop:5+'px'}} onClick={handleSubmitExcel}>Import Excel File</button>
          </Box>
          <MasterListTable />
        </Box>
        </Box>
        </>
      }
      
    </>
  )
}

export default MasterList
