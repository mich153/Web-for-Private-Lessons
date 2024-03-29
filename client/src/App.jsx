import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
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
import UpdateStudent from './pages/UpdateStudent.jsx'
import CreateSchoolSubject from './pages/CreateSchoolSubject.jsx'
import SchoolSubjectsList from './pages/SchoolSubjectsList.jsx'
import CreateTeacher from './pages/CreateTeacher.jsx'
import TeachersFullList from './pages/TeachersFullList.jsx'
import UpdateTeacher from './pages/UpdateTeacher.jsx'
import CreateCoordinators from './pages/CreateCoordinators.jsx'
import CoordinatorsList from './pages/CoordinatorsList.jsx'
import UpdateCoordinator from './pages/UpdateCoordinator.jsx'
import ClassesNavigateCdn from './pages/ClassesNavigteCdn.jsx'
import SpecificTeachers from './pages/SpecificTeachers.jsx'
import DefineTimes from './pages/DefineTimes.jsx'
import PossibleTimes from './pages/PossibleTimes.jsx'
import SearchTeachers from './pages/SearchTeachers.jsx'
import LessonsRegistration from './pages/LessonsRegistration.jsx'
import LessonsList from './pages/LessonsList.jsx'
import Profile from './pages/Profile.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import LessonsReport from './pages/LessonReport.jsx'
import LearnedLessons from './pages/LearnedLessons.jsx'

function App() {
  return(
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={ <Main /> } />
          <Route path="/*" element={ <NoPage /> } />
          <Route path="/login" element={ <LogIn /> } />
          <Route path="/home" >
            {/** protected pages */}
            <Route index element={ 
              <AuthRequired 
              admin={<Admin />} 
              student={<HomeStudent />} 
              teacher={<HomeTeacher />}
              coordinator={<HomeCoordinator />} />
            } />

            <Route path='profile' element={ 
              <AuthRequired 
              student={<Profile />} 
              teacher={<Profile />}
              coordinator={<Profile />} />
            } />

            <Route path='change-password' element={ 
              <AuthRequired 
              student={<ChangePassword />} 
              teacher={<ChangePassword />}
              coordinator={<ChangePassword />} />
            } />

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

            <Route path='students-list'>
              <Route index element={
                <AuthRequired
                admin={<ClassesNavigate />}
                coordinator={<ClassesNavigateCdn />} />
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
              <Route path="update-student/:student_id" element={ 
                <AuthRequired
                admin={<UpdateStudent />} />
              } />
            </Route>

            <Route path='school-subjects'>
              <Route index element={
                <AuthRequired
                admin={<SchoolSubjectsList />} />
              } />
              <Route path='new' element={ 
                <AuthRequired
                admin={<CreateSchoolSubject />} />
              } />
            </Route>
            
            <Route path='teachers-list'>
              <Route index element={
                <AuthRequired
                admin={<TeachersFullList />} />
              } />
              <Route path=':subject' element={
                <AuthRequired
                coordinator={<SpecificTeachers />} />
              } />
              <Route path='add-teacher' element={
                <AuthRequired
                admin={<CreateTeacher />} />
              } />
              <Route path='update-teacher/:teacher_id' element={
                <AuthRequired
                admin={<UpdateTeacher />} />
              } />
            </Route>
           
            <Route path='coordinators-list'>
              <Route index element={
                <AuthRequired
                admin={<CoordinatorsList />} />
              } />
              <Route path='add-coordinator' element={
                <AuthRequired
                admin={<CreateCoordinators />} />
              } />
              <Route path='update-coordinator/:coordinator_id' element={
                <AuthRequired
                admin={<UpdateCoordinator />} />
              } />
            </Route>
            
            <Route path='possible-times'>
              <Route index element={
                  <AuthRequired
                  coordinator={<PossibleTimes />}
                  teacher={<PossibleTimes />} />
                } />
              <Route path='set-times' element={
                <AuthRequired
                coordinator={<DefineTimes />}
                teacher={<DefineTimes />} />
              } />
            </Route>

            <Route path='report' element={
              <AuthRequired
              coordinator={<LessonsReport />}
              teacher={<LessonsReport />} />
            } />

            <Route path='registration'>
              <Route index element={
                <AuthRequired
                student={<SearchTeachers />} />
              } />
              <Route path=':subject_id/:unit' element={
                <AuthRequired
                student={<LessonsRegistration />} />
              } />
            </Route>

            <Route path='lessons-list' element={
                <AuthRequired
                student={<LessonsList />}
                coordinator={<LessonsList />}
                teacher={<LessonsList />} />
            } />

            <Route path='learned' element={
                <AuthRequired
                student={<LearnedLessons />}/>
            } />

          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App