import React from 'react'
import { Outlet } from 'react-router'
import MiniDrawer from './Sidebar'
const WithNav = () => {
  return (
    <>
      <MiniDrawer />
      <Outlet />
    </>
  )
}

export default WithNav
