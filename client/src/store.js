import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateProfileReducer,
  ValidReducer,
  UpdateUserRoleReducer,
  userNumbersReducer,
  userProfileReducer
} from './redux/reducers/userReducer'

import {
  taskListReducer,
  taskDetailsReducer,
  taskCreateReducer,
  taskDeleteReducer,
  taskCheckedReducer,
  taskPassedReducer,
  taskNotPassedReducer,
  taskMyListReducer
} from './redux/reducers/taskReducer'

import {
  createAnswerReducer,
  // answerDetailsReducer,
  answerMyListReducer,
  answersListReducer,
  answerListDeleteReducer,
  OneAnswerReducer,
  UpdateAnswerStatusReducer
} from './redux/reducers/answerReducer'

import {
  courseListReducer,
  courseDetailsReducer,
  courseDeleteReducer,
  courseCreateReducer,
  AdmincourseListReducer,
  courseUpdateReducer
} from './redux/reducers/courseReducer'

import {
  weekListReducer,
  weekUpdateReducer
} from './redux/reducers/weekReducer'
import {
  dayListReducer,
  dayDetailsReducer,
  dayUpdateReducer
} from './redux/reducers/dayReducer'
import {
  myQuizListReducer,
  quizDetailsReducer,
  quizCreateReducer,
  quizListReducer,
  quizDeleteReducer,
  quizUpdateReducer
} from './redux/reducers/quizReducer'
import {
  createQuizAnswerReducer,
  quizAnswerMyListReducer,
  quizAnswerListReducer
} from './redux/reducers/quizAnswerReducer'

import { orderCreateReducer } from './redux/reducers/orderReducer'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateProfileReducer,
  userUpdateRole: UpdateUserRoleReducer,
  userNumbers: userNumbersReducer,
  userProfile: userProfileReducer,
  //task
  taskDetails: taskDetailsReducer,
  taskList: taskListReducer,
  taskCreate: taskCreateReducer,
  taskDelete: taskDeleteReducer,
  taskCheck: taskCheckedReducer,
  taskPassed: taskPassedReducer,
  taskNotPassed: taskNotPassedReducer,
  taskListMy: taskMyListReducer,
  answerCreate: createAnswerReducer,
  quizAnswerCreate: createQuizAnswerReducer,
  // answerDetails: answerDetailsReducer,
  answerMyList: answerMyListReducer,
  listAnswer: answersListReducer,
  listAnswerDelete: answerListDeleteReducer,
  OneAnswer: OneAnswerReducer,
  AnswerStatus: UpdateAnswerStatusReducer,
  isTokenValid: ValidReducer,
  courseList: courseListReducer,
  AdminCourseList: AdmincourseListReducer,
  courseDetails: courseDetailsReducer,
  courseCreate: courseCreateReducer,
  courseDelete: courseDeleteReducer,
  courseUpdate: courseUpdateReducer,
  weekList: weekListReducer,
  weekUpdate: weekUpdateReducer,
  dayList: dayListReducer,
  dayDetails: dayDetailsReducer,
  dayUpdate: dayUpdateReducer,
  myQuizList: myQuizListReducer,
  quizDetails: quizDetailsReducer,
  quizCreate: quizCreateReducer,
  quizList: quizListReducer,
  quizAnswerMyList: quizAnswerMyListReducer,
  quizDelete: quizDeleteReducer,
  quizAnswerList: quizAnswerListReducer,
  quizUpdate: quizUpdateReducer,
  orderCreate: orderCreateReducer
})

const userDetailsFromStorage = localStorage.getItem('userDetail')
  ? JSON.parse(localStorage.getItem('userDetail'))
  : {}

const initialState = {
  userLogin: { userDetail: userDetailsFromStorage }
} // here we can get localStorage, token
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
