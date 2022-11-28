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
import { Box } from '@mui/system'
import { Button } from '@mui/material'

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
const SessionTable = ({ classId, sessionId }) => {
  const [data, setData] = useState([])
  const [classDataList, setClassDataList] = useState([])
  useEffect(() => {
    const getClassList = async () => {
      const { data } = await axiosInstance.get(
        `/class/get/class/list/${classId}`
      )
      setClassDataList(data)
    }
    getClassList()

    const getAtttendanceSession = async () => {
      await axiosInstance.post(`session/get-attendance`,{
        session_id:sessionId
      }).then(res => {
        if(res.status === 200){
          setData(res?.data)
        }
      })
    }

    getAtttendanceSession()

  }, [classId, sessionId])


    const unique = Object.values(
    classDataList.reduce((a, b) => {
        if (!a[b.student_fullname]) a[b.student_fullname] = b
        return a
    }, {})
    )
    const sched = classDataList.filter((dt) => dt.day !== '')
    const uniqueSched = Object.values(
    sched.reduce((a, b) => {
        if (!a[b.day]) a[b.day] = b
        return a
    }, {})
    )
    return (
    <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 'bolder' }}>
            {unique ? unique[0]?.sub_name + ': ' + unique[0]?.sub_desc : null}
        </div>
        {uniqueSched.map((item, index) => {
            let start = new Date(item.start_time).toLocaleTimeString()
            let end = new Date(item.end_time).toLocaleTimeString()
            return (
            <div key={index}>
                <div>
                <strong>Schedule :</strong> {item.day}
                <br />
                {start && start} | {end && end}
                </div>
            </div>
            )
        })}
        </Box>

        <MaterialTable
        icons={tableIcons}
        // eslint-disable-next-line no-useless-concat
        title={'Teacher' + ' ' + unique[0]?.fullname}
        options={{
            draggable: false,
            sorting: false,
            search: true,
            actionsColumnIndex: -1,
            pageSize: 5,
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
            exportMenu: [
            {
                label: 'Export PDF',
                exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, 'myPdfFileName'),
            },
            {
                label: 'Export CSV',
                exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, 'myCsvFileName'),
            },
            ],
        }}
        columns={[
            { title: 'Name', field: 'fullname' },
            { title: 'ID No.', field: 'student_id' },
            { title: 'Year', field: 'yr_lvl' },
            { title: 'Section', field: 'section' },
            { title: 'Time In', field: 'time_in' },
            { title: 'Remarks', field: 'status' },
            // {
            //   render: (rowData) => (
            //     <div>
            //       <Button
            //         variant="contained"
            //         color={rowData.status === 'late' ? 'warning' : ( rowData.status === 'present' ? 'info' : 'error') }
            //         size='small'
            //         sx={{ pointerEvents:'none', borderRadius:'30px', padding:'0px 10px'}}
            //       >
            //         {rowData.status}
            //       </Button>
            //     </div>
            //   ),
            //   title:'Remarks',
            // },
        ]}
        data={data && data}
        />
    </>
    )
}

export default SessionTable
