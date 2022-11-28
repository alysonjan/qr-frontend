import { Box, Button } from '@mui/material'
import React, { useState } from 'react'
import SubjectModal from '../../components/Modals/SubjectModal'
import SubjectManagementTable from '../../components/Tables/SubjectManagementTable'

const SubjectManagement = () => {
    const [open, setOpen] = useState(false);
    return (
    <>
    <SubjectModal
        open={open}
        setOpen={setOpen}
    />
        <Box
        sx={{
            height: '80vh',
            width: '80%',
            margin: 'auto',
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
            <Button onClick={() => setOpen(true)} variant='contained' size='medium' sx={{ mb:2 }} color='success'>Add new subject</Button>
            <SubjectManagementTable />
        </Box>
        </Box>
    </>
    )
}

export default SubjectManagement
