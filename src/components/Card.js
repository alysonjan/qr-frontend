import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export default function BasicCard({ year }) {
  return (
    <>
      <Card
        sx={{ minWidth: 250, height: 100, backgroundColor: '#FBAF41', m: 1 }}
      >
        <CardContent>
          <Typography variant="h6">School Year</Typography>
          <Typography variant="h5">{year}</Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </>
  )
}
