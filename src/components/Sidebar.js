import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event'
import LogoutIcon from '@mui/icons-material/Logout'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import HistoryIcon from '@mui/icons-material/History';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import SubjectIcon from '@mui/icons-material/Subject';
import { Menu, MenuItem } from '@mui/material'
import { AccountCircle } from '@material-ui/icons'

const drawerWidth = 240


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: '#1BA4DB',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))


export default function MiniDrawer() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const logoutHandler = (e) => {
    e.preventDefault()
    // window.localStorage.removeItem(
    //   '$2a$12$AV9q8pQqQ5zVz2iVSvQTsOfVfbM.SvVvCO4wtED8m/A3dup.x4VhW'
    // )
    window.localStorage.clear()
    window.location.reload()
  }

  const firstname = localStorage.getItem('fname')
  const lastname = localStorage.getItem('lname')

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            iconStyle="large"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
          SWU CITE QR Attendance Monitoring System 
          </Typography>
          <div>
            
            <Box sx={{ position:'relative', left:830}}>
            <Typography variant="subtitle" > Welcome, {firstname} {lastname} </Typography>
                <IconButton
                  size='large'
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
              <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* <MenuItem hidden={true}>Profile</MenuItem> */}
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </Menu>
              </Box>
          </div>
        </Toolbar>

      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}> */}
          {/* <IconButton>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List>
        {localStorage.getItem('role') === 'teacher' ?
        <>
          <Link
            to='/teacher-homepage'
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem button key={'Dashboard'}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
          </Link>
       
          <Link
            to="/masterlist"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem button key={'MasterList'}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary={'MasterList'} />
            </ListItem>
          </Link>

          <Link to="/attendance-report" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'Attendance Report'}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={'Attendance Report'} />
            </ListItem>
          </Link>
          {/* <Link to="/logout" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'Logout'} onClick={logoutHandler}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </Link> */}
        </>
        : localStorage.getItem('role') === 'admin' ?
        <>
        <Link
            to="/school-year"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem button key={'School Year'}>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={'School Year'} />
            </ListItem>
          </Link>
          <Link
            to="/masterlist"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ListItem button key={'MasterList'}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary={'MasterList'} />
            </ListItem>
          </Link>

          <Link to="/user-management" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'User Management'}>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary={'User Management'} />
            </ListItem>
          </Link>
          <Link to="/subject-management" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'Subjects'}>
              <ListItemIcon>
                <SubjectIcon />
              </ListItemIcon>
              <ListItemText primary={'Subjects'} />
            </ListItem>
          </Link>

          <Link to="/admin-history" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'History'}>
              <ListItemIcon>
                <HistoryToggleOffIcon />
              </ListItemIcon>
              <ListItemText primary={'History'} />
            </ListItem>
          </Link>
          {/* <Link to="/logout" style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key={'Logout'} onClick={logoutHandler}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </Link> */}

        </> : null
        }
       
    
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        
      </Box>
    </Box>
  )
}
