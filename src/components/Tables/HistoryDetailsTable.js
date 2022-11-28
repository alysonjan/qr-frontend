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

const HistoryDetailsTable = ({ data }) => {

  return (
    <MaterialTable
      icons={tableIcons}
      title="Attendance Report Details"
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
        { title: 'Fullname', field: 'fullname' },
        { title: 'Student ID', field: 'student_id' },
        { title: 'Section', field: 'section' },
        { title: 'Year', field: 'yr_lvl' },
        // {
        //   render: (rowData) => (
        //     <div>{rowData?.time_in === 'none' ? rowData.time_in : new Date(rowData.time_in).toLocaleTimeString() } </div>
        //   ),
        //   title:'Time In',
        // },
        { title: 'Date/Time', field: 'time_in' },
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
  )
}

export default HistoryDetailsTable
