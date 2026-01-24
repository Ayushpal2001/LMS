import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { Button } from './components/ui/button'
import MainLayout from './MainLayout'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
import CourseTable from './pages/admin/course/CourseTable'
import Dashboard from './pages/admin/Dashboard'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLectures from './pages/admin/lectures/CreateLecture'
import EditLecture from './pages/admin/lectures/EditLecture'
import CourseDetail from './pages/admin/CourseDetail'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout/>,
    children:[
      {
        path:"/",
        element:(
        <>
        <HeroSection/>
        <Courses/>
        </>
        ),
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"my-learning",
        element:<MyLearning/>
      },
      {
        path:"profile",
        element:<Profile/>
      },
      {
        path:"course-detail/:courseId",
        element:<CourseDetail/>
      },



      // admin  routes
      {
        path:"admin",
        element:<Sidebar/>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLectures/>
          },
          {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture/>
          },
        ]
      }
    ]
  }
])

function App() {

  return (
    <main>
     <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App


// mongodb+srv://lmsadmin:ayush123@cluster0.lxfsxkt.mongodb.net/?appName=Cluster0