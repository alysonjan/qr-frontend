import React from 'react'
import MaterialTable from '@material-table/core'
import { forwardRef } from 'react'
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

import { ExportCsv, ExportPdf } from '@material-table/exporters'
import { Button } from '@mui/material'
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

const HistoryTable = ({ data }) => {
  let navigate = useNavigate()
// const data = [
//     {
//         subject_name:"New Venture",
//         teacher_fullname:"Farah Sombilon"
//     },
//     {
//         subject_name:"Capstorm",
//         teacher_fullname:"Farah Sombilon"
//     },
//     {
//         subject_name:"SSP",
//         teacher_fullname:"Farah Sombilon"
//     },
//     {
//         subject_name:"Programing I",
//         teacher_fullname:"Farah Sombilon"
//     },
// ]
  return (
    <MaterialTable
      icons={tableIcons}
      title="Attendance Report"
      options={{
        draggable: false,
        sorting: false,
        search: true,
        paging: false,
        emptyRowsWhenPaging: false,
        rowStyle: {
          backgroundColor: '#EEE',
        },
        headerStyle: {
          backgroundColor: '#1BA4DB',
          color: '#ffff',
          fontWeight: 'bolder',
          fontSize: '1rem',
          position: 'sticky',
          zIndex: 10,
        },
        maxBodyHeight: '500px',
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
        { title: 'Class Description', field: 'sub_desc' },
        { title: 'Teacher', field: 'fullname' },
        { title: 'Date', field: 'date_created' },
        {
          render: (rowData) => (
            <div>
              <Button
                variant="contained"
                color="success"
                onClick={() =>
                  navigate(`/attendance-report-details/${rowData.date_created}`)
                }
              >
                View Details
              </Button>
            </div>
          ),
        },

      ]}
      data={data && data}
    />
  )
}

export default HistoryTable
