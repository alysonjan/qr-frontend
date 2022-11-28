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
import LockResetIcon from '@mui/icons-material/LockReset';
import { Button } from '@mui/material'
import UpdatePasswordModal from '../Modals/UpdatePasswordModal'

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
const UserManagementTable = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
    const [ data, setData ] = useState([])
    useEffect(() => {
        const getAllUsers = async() => {
          await axiosInstance.get('/employee/get/users').then(res => {
            if(res.status === 200){
                setData(res?.data)
            }
          })
        }
        getAllUsers()
      },[])

    const [changeTrigger, setChangeTrigger] = useState(false);
    return (
    <>
    <UpdatePasswordModal setOpen={setOpen} open={open} userID = {id}/>
    <MaterialTable
    icons={tableIcons}
    // eslint-disable-next-line no-useless-concat
    title='Users'
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
        { title: 'UserID', field: 'user_id' , hidden:true},
        { title: 'EmployeeID', field: 'employee_id' },
        { title: 'Firstname', field: 'fname' },
        { title: 'Lastname', field: 'lname' },
        { title: 'Username', field: 'username' },
        { title: 'Role', field: 'position' },
        {
          render: (rowData) => (
            <div>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#737373'}}
                size='small'
                onClick={() =>[ setOpen(true), setId(rowData.user_id)]}
              >
                <LockResetIcon/>
              </Button>
            </div>
          ),
          title:'Password'
        },
    ]}
    data={data}
    editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              // const dataUpdate = data
              const dataUpdate = data
              const index = oldData.tableData.user_id
              dataUpdate[index] = newData
              axiosInstance.post('/employee/user/update', {
                  user_id: data[index]?.user_id,
                  employee_id: dataUpdate[index]?.employee_id,
                  firstname: dataUpdate[index]?.fname,
                  lastname: dataUpdate[index]?.lname,
                  username: dataUpdate[index]?.username,
                  position: dataUpdate[index]?.position,
                })
                .then((response) => {
                  if (response.data.errors) {
                    reject()
                  } else {
                    setData([...dataUpdate]);
                    setChangeTrigger(!changeTrigger)
                    resolve()
                    window.location.reload(false)
                  }
                })
            }, 1000)
          }),

        onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  axiosInstance.post('/employee/user/delete',
                      {
                          user_id: data[index]?.user_id,
                      }).then((response) => {
                          if (response.data.errors) {
                              reject();
                          } else {
                              setData([...dataDelete]);
                              setChangeTrigger(!changeTrigger);
                              resolve();
                          }
                      });
              }, 1000)
          }),
      }}
    />
    </>
    )
}

export default UserManagementTable
