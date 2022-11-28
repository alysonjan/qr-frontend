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
import ClassModal from '../../components/Modals/ClassModal'
import { classForm } from '../../constants/constantStates'
import Switch from '@mui/material/Switch';

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

const SubjectTable = ({ yearId,semId }) => {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  let navigate = useNavigate()
  const [data, setData] = useState([])
  const [openClass, setOpenClass] = useState(false)
  const [newClass, setNewClass] = useState(classForm)

  // const [yrData, setyrData] = useState();
  // useEffect(() => {
  //   const getYear = async() => {
  //     const { data } = await axiosInstance.get('/school/year/get')
  //     setyrData(data)
  //   }
  //   getYear()
  // },[])
  // const filterYear = yrData?.find(dt => dt.sy_id === parseInt(yearId))
  // const [disable, setDisable] = useState(filterYear && filterYear === 0 ? false : filterYear && filterYear === 1 ? true : undefined);
  // const disableHandler = async(e) => {
  //   try {
  //     await axiosInstance.post('/school/year/update/status',{
  //       syID:yearId,
  //       status:disable
  //     }).then(res => {
  //       if (res.status === 200) {
  //         // alert(res?.data.msg)
  //       }
  //     })
  //   } catch (err) {
  //     console.error(err.message)
  //   }
  // }

  useEffect(() => {
    const getData = async () => {
      await axiosInstance.get(`/class/get/${yearId}/${semId}`).then((res) => {
        if (res.status === 200) {
          setData(res?.data)
        }
      })
    }
    getData()
  }, [yearId,semId,setData])
  return (
    <>
    <ClassModal
      openClass={openClass}
      setOpenClass={setOpenClass}
      newClass={newClass}
      setNewClass={setNewClass}
      yrID = {yearId}
    />

    <MaterialTable
      icons={tableIcons}
      title="Subjects"
      actions={[
        {
          icon: () =>  
          <Button
          variant="contained"
          color='success'
          size="small"
          // onClick={() => navigate(`/class/${yearId}/${rowData.sub_id}`)}
          onClick={() => setOpenClass(true)}
          > 
          Add Class
          </Button>,
          isFreeAction: true,
          tooltip: 'Add Button',
        },
        // {
        //   icon: () =>  
        //   // <Switch {...label} value={disable} onChange={(e) => setDisable(e.target.checked)} onClick={disableHandler} />,
        //   <Switch {...label} />,
        //   isFreeAction: true,
        //   tooltip: 'Set this year to inactive',
        // }
      ]}
      options={{
        draggable: false,
        sorting: false,
        search: true,
        actionsColumnIndex: -1,
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
      }}
      columns={[
        { title: 'ID', field: 'class_id', hidden: true },
        { title: 'Class Description', field: 'sub_desc' },
        { title: 'Section', field: 'section' },
        { title: 'Semester', field: 'sem_id' },
        { title: 'Teacher', field: 'fullname' },
        {
          render: (rowData) => (
            <div>
              <Button
                variant="contained"
                color='success'
                onClick={() =>
                  navigate(
                    `/class/${rowData.sub_desc}/${rowData.sy_id}/${rowData.class_id}`
                  )
                }
              >
                Select
              </Button>
            </div>
          ),
        },
      ]}
      data={data}
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
    </>
  )
}

export default SubjectTable
