import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './pages/Home.jsx'
import NoPage from './pages/NoPage.jsx'
import LogIn from './pages/LogIn.jsx'
import AuthRequired from './routers/AuthRequired.jsx'
import HomeTeacher from './pages/HomeTeacher.jsx'
import HomeStudent from './pages/HomeStudent.jsx'
import HomeCoordinator from './pages/HomeCoordinator.jsx'
import Admin from './pages/Admin.jsx'
import StudentsList from './pages/StudentsList.jsx'
import CreateStudent from './pages/CreateStudent.jsx'
import Classes from './pages/ClassesList.jsx'
import AddClass from './pages/AddClass.jsx'
import ClassesNavigate from './pages/ClassesNavigate.jsx'
import StudentsInfoStudy from './pages/StudentsInfoStudy.jsx'

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Main /> } />
          <Route path="/*" element={ <NoPage /> } />
          <Route path="/login" element={ <LogIn /> } />
          <Route path="/home" >
            {/** protected home page */}
            <Route index element={ 
              <AuthRequired 
              admin={<Admin />} 
              student={<HomeStudent />} 
              teacher={<HomeTeacher />}
              coordinator={<HomeCoordinator />} />
            } />
            {/** only for admin */}
            <Route path="classes" >
              <Route index element={ 
                <AuthRequired 
                admin={<Classes />} />
              } />
              <Route path="add-class" element={ 
                <AuthRequired 
                admin={<AddClass />} />
              } />
            </Route>
            {/** for admin and coordintor */}
            <Route path='students-list'>
              <Route index element={
                <AuthRequired
                admin={<ClassesNavigate />}
                coordinator={<ClassesNavigate />} />
              } />
              <Route path=":class_id/:class_number" element={
                <AuthRequired
                admin={<StudentsList />}
                coordinator={<StudentsInfoStudy />} />
              } />
              <Route path="add-student" element={ 
                <AuthRequired
                admin={<CreateStudent />} />
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App