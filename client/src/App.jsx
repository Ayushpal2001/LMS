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
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'
import { AdminRoute, AuthenticatedUser, ProtectedRoute } from './components/ProtectedRoute'
import PurchaseCourseProtectedRoute from './components/PurchasedCourseProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'

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
        element:<AuthenticatedUser><Login/></AuthenticatedUser>
      },
      {
        path:"my-learning",
        element:<ProtectedRoute><MyLearning/></ProtectedRoute>
      },
      {
        path:"profile",
        element:<ProtectedRoute><Profile/></ProtectedRoute>
      },
      {
        path:"course/search",
        element:<ProtectedRoute><SearchPage/></ProtectedRoute>
      },
      {
        path:"course-detail/:courseId",
        element:<ProtectedRoute><CourseDetail/></ProtectedRoute>
      },
      {
        path:"course-progress/:courseId",
        element:<ProtectedRoute><PurchaseCourseProtectedRoute><CourseProgress/></PurchaseCourseProtectedRoute></ProtectedRoute>
      },



      // admin  routes
      {
        path:"admin",
        element:<AdminRoute><Sidebar/></AdminRoute>,
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
      <ThemeProvider>
     <RouterProvider router={appRouter}/>
      </ThemeProvider>
    </main>
  )
}

export default App


