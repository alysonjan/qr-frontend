import MaterialTable from '@material-table/core'
import { forwardRef, useEffect, useState } from 'react'
import { ExportCsv, ExportPdf } from '@material-table/exporters'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import axiosInstance from '../../helpers/axios'
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}
const SubjectTable1 = ({ yearId }) => {
  const [filter, setFilter] = useState(false)
  const [semester, setSemester] = useState('all')
  let navigate = useNavigate()
  const [data, setData] = useState([])
  const [classDataList, setClassDataList] = useState([])

  // const [student, setStudent] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosInstance.get('/subject/get')
      setData(data)
    }
    getData()
  }, [])

  const filterSubject = data.filter((x) => x.sy_id === yearId)
  const [filterSem, setFilterSem] = useState(filterSubject)

  useEffect(() => {
    setFilterSem(
      semester === 'all'
        ? filterSubject
        : filterSubject.filter((dt) => dt.sem_id === semester)
    )
  }, [semester, setFilterSem, filterSubject])

  return (
    <MaterialTable
      icons={tableIcons}
      title="Subject Table"
      options={{
        draggable: false,
        sorting: false,
        search: true,
        actionsColumnIndex: -1,
        pageSize: 10,
        filtering: filter,
        pageSizeOptions: [10],
        emptyRowsWhenPaging: false,
        rowStyle: {
          backgroundColor: '#EEE',
        },
        headerStyle: {
          backgroundColor: '#1BA4DB',
          color: '#ffff',
          fontWeight: 'bolder',
          fontSize: '1rem',
        },
        // exportMenu: [
        //   {
        //     label: 'Export PDF',
        //     exportFunc: (cols, datas) =>
        //       ExportPdf(cols, datas, 'myPdfFileName'),
        //   },
        //   {
        //     label: 'Export CSV',
        //     exportFunc: (cols, datas) =>
        //       ExportCsv(cols, datas, 'myCsvFileName'),
        //   },
        // ],
      }}
      actions={[
        {
          icon: () => (
            <Checkbox
              checked={filter}
              onChange={() => setFilter(!filter)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          ),
          tooltip: 'Hide/Show Filter option',
          isFreeAction: true,
        },
        {
          icon: () => (
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Semester
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                label="Semester"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value={1}>1st Semester</MenuItem>
                <MenuItem value={2}>2nd Semester</MenuItem>
                <MenuItem value={3}>Summer</MenuItem>
              </Select>
            </FormControl>
          ),
          tooltip: 'Filter Sem',
          isFreeAction: true,
        },
      ]}
      columns={[
        { title: 'Subject ID', field: 'sub_id', hidden: true },
        { title: 'Subject', field: 'sub_name' },
        { title: 'Description', field: 'sub_desc' },
        {
          render: (rowData) => (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  // navigate(`/subject/${rowData.school_yr}/${rowData.sy_id}`)
                  alert('hello')
                }
              >
                Select
              </Button>
            </div>
          ),
        },
      ]}
      data={filterSem ? filterSem : []}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            // setTimeout(() => {
            //   const dataUpdate = data
            //   const index = oldData.tableData.id
            //   dataUpdate[index] = newData
            //   axiosInstance
            //     .put('/api/events/update', {
            //       id: index,
            //       title: dataUpdate[index].title,
            //       description: dataUpdate[index].description,
            //       location: dataUpdate[index].location,
            //       date: dataUpdate[index].date,
            //       time: dataUpdate[index].time,
            //     })
            //     .then((response) => {
            //       if (response.data.error) {
            //         reject()
            //       } else {
            //         setData([dataUpdate])
            //         setChangeTrigger(!changeTrigger)
            //         resolve()
            //       }
            //     })
            // }, 1000)
          }),

        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            // setTimeout(() => {
            //   const dataDelete = [...data]
            //   const index = oldData.tableData.id
            //   dataDelete.splice(index, 1)
            //   axiosInstance
            //     .post('/api/events/delete', {
            //       id: index,
            //     })
            //     .then((response) => {
            //       if (response.data.error) {
            //         //response modal
            //         reject()
            //       } else {
            //         setData([...dataDelete])
            //         setChangeTrigger(!changeTrigger)
            //         resolve()
            //       }
            //     })
            // }, 1000)
          }),
      }}
    />
  )
}

export default SubjectTable1
