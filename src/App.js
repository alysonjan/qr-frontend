import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLoginPage from './pages/AdminLoginPage'
import MainPage from './pages/MainPage'
import TeacherHomePage from './pages/Teacher/TeacherHomePage'
import TeacherLoginPage from './pages/TeacherLoginPage'
import useLocalStorage from './context/UseLocalStorage'
import { useMemo } from 'react'
import { Auth } from './context/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import WithNav from './components/WithNav'
import WithoutNav from './components/WithoutNav'
import Class from './pages/Admin/Class'
import MasterList from './pages/Admin/MasterList'
import SchoolYear from './pages/Admin/SchoolYear'
import Subject from './pages/Admin/Subject'
import StudentDetails from './pages/Admin/StudentDetails'
import TeacherClassDetails from './pages/Teacher/TeacherClassDetails'
import TeacherHistory from './pages/Teacher/TeacherHistory'
import UserManagement from './pages/Admin/UserManagement'
import CreateSession from './pages/Teacher/CreateSession'
import TeacherHistoryDetails from './pages/Teacher/TeacherHistoryDetails'
import SubjectManagement from './pages/Admin/SubjectManagement'
import SuperAdminPage from './pages/SuperAdminPage'
import AdminHistory from './pages/Admin/AdminHistory'

function App() {
  const [user, setUser] = useLocalStorage(
    '$2a$12$AV9q8pQqQ5zVz2iVSvQTsOfVfbM.SvVvCO4wtED8m/A3dup.x4VhW'
  )
  const value = useMemo(() => ({ user, setUser }), [user, setUser])
  return (
    <div className="App">
      <Auth.Provider value={value}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<WithNav />}>
              <Route path="/school-year" element={<SchoolYear />} />
              <Route path="/subject/:year/:yearID" element={<Subject />} />
              <Route
                path="/class/:subject/:yearID/:classID"
                element={<Class />}
              />
              <Route path="/masterlist" element={<MasterList />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/subject-management" element={<SubjectManagement />} />
              <Route path="/admin-history" element={<AdminHistory />} />
              <Route
                path="/student-details/:studentID/:subject"
                element={<StudentDetails />}
              />
              <Route path="/teacher-homepage" element={<TeacherHomePage />} />
              <Route path="/teacher-class-details/:classId" element={<TeacherClassDetails />} />
              <Route path="/create-session/:classId" element={<CreateSession />} />
              <Route path="/attendance-report" element={<TeacherHistory />} />
              <Route path="/attendance-report-details/:date" element={<TeacherHistoryDetails />} />
            </Route>
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/super-admin" element={<SuperAdminPage />} />
            <Route path="/login-admin" element={<AdminLoginPage />} />
            <Route path="/login-teacher" element={<TeacherLoginPage />} />
 
          </Route>
        </Routes>
      </Auth.Provider>
    </div>
  )
}

export default App
