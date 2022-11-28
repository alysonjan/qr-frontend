import React from 'react'
import MaterialTable from '@material-table/core'
import { forwardRef, useEffect, useState } from 'react'
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
import { Button } from '@mui/material'
import axiosInstance from '../../helpers/axios'
import { useNavigate } from 'react-router-dom'
import { ExportCsv, ExportPdf } from '@material-table/exporters'

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

const StudentTable = ({ yearId }) => {
  let navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      await axiosInstance.get(`/class/get/${yearId}`).then((res) => {
        if (res.status === 200) {
          setData(res?.data)
        }
      })
    }
    getData()
  }, [yearId, setData])
  return (
    <>
    <MaterialTable
      icons={tableIcons}
      title="Student Summary"
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
          backgroundColor: '#96f87d',
          color: '#333333',
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
        { title: 'Name', field: 'fullname' },
        { title: 'ID no.', field: 'student_id' },
        { title: 'Class Code', field: 'class_code' },
        { title: 'Date', field: 'date' },
        { title: 'Time', field: 'time' },
        { title: 'Status', field: 'status' },
      ]}
      data={data}
    />
    </>
  )
}

export default StudentTable
