import Footer from './components/layout/Footer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, Image } from 'react-bootstrap'

import ProfileScreen from './components/screens/ProfileScreen'
import CourseLessonScreen from './components/screens/CourseLessonScreen'
import ResultScreen from './components/screens/ResultScreen'
import QuizScreen from './components/screens/QuizScreen'
import CourseContentScreen from './components/screens/CourseContentScreen'
import QuizAnswerScreen from './components/screens/QuizAnswerScreen'
import Checkout from './components/screens/Checkout'

import ErrorScreen from './components/screens/ErrorScreen'

import Assignments from './components/layout/Assignments'
import AssignmentDetail from './components/screens/AssignmentDetail'
import Privacy from './components/screens/privacy'
import EditProfileStudent from './components/screens/EditProfileStudent'
/* Admin Screen*/
import MangeCoures from './components/screens/AdminScreen/MangeCoures'
import UpdateCourese from './components/screens/AdminScreen/UpdateCourese'
/* Mentor Screen*/
import ManageMentorCourses from './components/screens/MentorScreen/ManageMentorCourses'
import UpdateMentorCourse from './components/screens/MentorScreen/UpdateMentorCourse'
import AddMentorQuiz from './components/screens/MentorScreen/AddMentorQuiz'
import EditMentorQuiz from './components/screens/MentorScreen/EditMentorQuiz'
import MentorUserListScreen from './components/screens/MentorScreen/MentorUserListScreen'
import MentorTaskList from './components/screens/MentorScreen/MentorTaskList'
import MentorQuizList from './components/screens/MentorScreen/MentorQuizList'
import QuizDetailsScreen from './components/screens/MentorScreen/QuizDetailsScreen'
import MentorCoursesList from './components/screens/MentorScreen/MentorCoursesList'
import TaskDetailsScreen from './components/screens/MentorScreen/TaskDetailsScreen'
import TaskUploadScreen from './components/screens/MentorScreen/TaskUploadScreen'

/* Private Routes  */
import DefaultRoutes from './components/Route/default/DefaultRoute'
import StudentRoute from './components/Route/student/StudentRoute'
import MentorRoute from './components/Route/mentor/MentorRoute'
import AdminRoute from './components/Route/admin/AdminRoute'
import UserListScreen from './components/screens/AdminScreen/UserList'

/*****************************************/
import 'malihu-custom-scrollbar-plugin'
import react, { useEffect } from 'react'
import WOW from 'wowjs'
import { script } from './assets/js/script'
import './App.css'
import './assets/css/main.css'
import './assets/css/responsive.css'
import Quizzes from './components/layout/Quizzes'
import AssignmentScreen from './components/screens/AssignmentScreen'

function App() {
  useEffect(() => {
    console.log('hi***')

    //script()
    new WOW.WOW({
      live: false
    }).init()
  }, [])

  return (
    <div className="App">
      <Switch>
        {/* Private Route for Admin  */}
        <AdminRoute exact path="/admin-users-list" component={UserListScreen} />
        <AdminRoute exact path="/admin-courses-list" component={MangeCoures} />
        <AdminRoute
          exact
          path="/admin-page/:pageNumber"
          component={MangeCoures}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin-coure-update/:id"
          component={UpdateCourese}
        ></AdminRoute>

        {/* Private Route for Mentor  */}
        <MentorRoute
          exact
          path="/mentor-courses-list"
          component={MentorCoursesList}
        />

        <MentorRoute
          exact
          path="/mentor-users-list"
          component={MentorUserListScreen}
        />

        <MentorRoute
          exact
          path="/manage-mentor-course/:id"
          component={ManageMentorCourses}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-course-update/:weekId/:id"
          component={UpdateMentorCourse}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-add-quiz/:bootcampId/:weekId/:id?"
          component={AddMentorQuiz}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-show-quiz/:bootcampId/:weekId/:id"
          component={QuizScreen}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/edit-quiz/:bootcampId/:weekId/:id"
          component={EditMentorQuiz}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-upload-assignment/:bootcampId/:weekId"
          component={TaskUploadScreen}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-task-list/:bootcampId"
          component={MentorTaskList}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/mentor-quiz-list/:bootcampId"
          component={MentorQuizList}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/quiz-details/:bootcampId/:weekId/:id"
          component={QuizDetailsScreen}
        ></MentorRoute>

        <MentorRoute
          exact
          path="/task-details/:bootcampId/:id"
          component={TaskDetailsScreen}
        ></MentorRoute>

        {/* Private Route for Students  */}
        <StudentRoute
          exact
          path="/assignments"
          component={Assignments}
        ></StudentRoute>

        <StudentRoute exact path="/quizzes" component={Quizzes}></StudentRoute>

        <StudentRoute
          exact
          path="/profile"
          component={ProfileScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/edit-profile-student"
          component={EditProfileStudent}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/course-content/:id"
          component={CourseLessonScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/assignment-details/:bootcampId/:id"
          component={AssignmentDetail}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/lessons"
          component={CourseContentScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/quiz/:id/result"
          component={ResultScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/quiz/:bootcampId/:weekId/:id"
          component={QuizScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/quiz-answer/:bootcampId/:weekId/:id"
          component={QuizAnswerScreen}
        ></StudentRoute>

        <StudentRoute
          exact
          path="/checkout/:bootcampId"
          component={Checkout}
        ></StudentRoute>

        {/* default Routes for guests  */}
        <Route component={DefaultRoutes}></Route>
      </Switch>
    </div>
  )
}

export default App
