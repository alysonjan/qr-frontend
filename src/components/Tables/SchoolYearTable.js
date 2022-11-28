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
import axiosInstance from '../../helpers/axios'
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

const SchoolYearTable = () => {
  let navigate = useNavigate()
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosInstance.get('/school/year/get')
      setData(data)
    }
    getData()
  }, [])

  return (
    <MaterialTable
      icons={tableIcons}
      title="School Year"
      options={{
        draggable: false,
        sorting: false,
        search: true,
        actionsColumnIndex: -1,
        // pageSize: 10,
        // pageSizeOptions: [10],
        paging: false,
        emptyRowsWhenPaging: false,
        rowStyle: {
          backgroundColor: '#EEE',
        },
        headerStyle: {
          backgroundColor: '#FBAF41',
          color: '#333333',
          fontWeight: 'bolder',
          fontSize: '1rem',
          position: 'sticky',
          zIndex: 10,
        },
        maxBodyHeight: '500px',
      }}
      columns={[
        { title: 'School Year', field: 'school_yr' },
        {
          render: (rowData) => (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  navigate(`/subject/${rowData.school_yr}/${rowData.sy_id}`)
                }
              >
                Select
              </Button>
            </div>
          ),
        },
      ]}
      data={data ? data : []}
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

export default SchoolYearTable
