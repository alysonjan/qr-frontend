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
import { Button } from '@mui/material'
import QRCode from 'qrcode'
import fileDownload from 'js-file-download'
import { dataURLtoFile } from '../../utils/util'


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
const GeneralMasterlistTable = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosInstance.get('/student/get')
      setData(data)
    }
    getData()
  }, [])
  const [changeTrigger, setChangeTrigger] = useState(false);
  const generateQR = async (rowdata) => {
    try {
      console.log("TRIGGER",rowdata)
      const response = await QRCode.toDataURL(JSON.stringify(rowdata))
      var convertedFile = dataURLtoFile(response, `${Math.random(10)}.png`);
      fileDownload(convertedFile, 'myqr.png')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <MaterialTable
      icons={tableIcons}
      title="General Masterlist"
      options={{
        draggable: false,
        sorting: false,
        search: true,
        actionsColumnIndex: -1,
        // pageSize: 5,
        // pageSizeOptions: [5],
        paging: false,
        // emptyRowsWhenPaging: false,
        rowStyle: {
          backgroundColor: '#EEE',
        },
        headerStyle: {
          backgroundColor: '#1BA4DB',
          color: '#ffff',
          fontWeight: 'bolder',
          position: 'sticky',
          zIndex: 10,
          fontSize: '1rem',
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
        {
          title: 'Name',
          field: 'fullname',
        },
        { title: 'ID', field: 'id', hidden:true },
        { title: 'ID no.', field: 'student_id' },
        { title: 'Year', field: 'yr_lvl' },
        { title: 'Section', field: 'section' },
        { title: 'Status', field: 'status' },
        {
          render: (rowData) => {
            const newObj ={
              fullname:rowData.fullname,
              section:rowData.section,
              status:rowData.status,
              student_id:rowData.student_id,
            }
            return (
              <div>
              <Button
                variant="contained"
                color="success"
                size='small'
                onClick={() =>
                  generateQR(newObj)
                }
              >
                Generate QR
              </Button>
            </div>
            )
          },
          title:'QR CODE'
        },
      ]}
      data={data ? data : []}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              // const dataUpdate = data
              const dataUpdate = data
              const index = oldData.tableData.id
              dataUpdate[index] = newData
              axiosInstance.post('student/update-student', {
                  id: data[index]?.id,
                  student_id: dataUpdate[index]?.student_id,
                  section: dataUpdate[index]?.section,
                  year_level: dataUpdate[index]?.yr_lvl,
                  status: dataUpdate[index]?.status,
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
                axiosInstance.post('student/delete-student',
                    {
                      id: index,
                    }).then((response) => {
                        if (response.data.errors) {
                            reject();
                        } else {
                            setData([...dataDelete]);
                            setChangeTrigger(!changeTrigger);
                            resolve();
                            window.location.reload(false)
                        }
                    });
            }, 1000)
        }),
      }}
    />
  )
}

export default GeneralMasterlistTable
