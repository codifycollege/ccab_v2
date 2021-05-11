import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import {
  getCourseDetails,
  updateCourse
} from './../../../redux/actions/courseAction'
import { getUsers } from './../../../redux/actions/userAction'
import {
  Table,
  Col,
  Row,
  Modal,
  Button,
  Container,
  Form
} from 'react-bootstrap'
import { Card, Accordion } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function UpdateCourese({ match }) {
  const dispatch = useDispatch()

  /********* Call Reduser ************/

  // update course reducer
  const { loading: Updateloading, error, success: UpdateSuccess } = useSelector(
    (state) => state.courseUpdate
  )

  // get Users list reducer
  const { users, loading: getUsersLoading, error: getUsersError } = useSelector(
    (state) => state.userList
  )

  // get course Details Reducer
  const {
    course,
    loading: CourseDetailsloading,
    error: CourseDetailsError
  } = useSelector((state) => state.courseDetails)

  /*******************/

  /********* State And Var ************/
  const ID = match.params.id

  const [students, setStudents] = useState([]) // done
  const [Mentor, setMentor] = useState({}) // done
  const [price, setPrice] = useState(course.price)
  const [name, setName] = useState(course.name)
  const [description, setDescription] = useState(course.description)
  const [category, setCategory] = useState(course.category)
  const [startDate, setStartDate] = useState(new Date())
  const [seats, setSeats] = useState(course.seats)
  const [published, SetPublished] = useState(course.published)
  const [VideoUrl, setVideoUrl] = useState('')
  const [ImageUrl, setImageUrl] = useState('')
  const [ImageLable, setImageLable] = useState('jpg,png file...')
  const [weeks, setWeeks] = useState(course.weeks)
  const [MentorsList, setMentorsList] = useState([])
  const [StudentsList, setStudentsList] = useState([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectStudentErr, setSelectStudentErr] = useState('')

  //video
  const [showVideo, setShowVideo] = useState(false)

  // update err
  const [updateErr, setUpdateErr] = useState('')
  /*******************/

  useEffect(() => {
    // call the getter ( course Details  and users list )
    dispatch(getCourseDetails(ID))
    dispatch(getUsers())
  }, [ID, dispatch, match])

  /********* functions  ************/
  const _setDefaultValuse = () => {
    setMentor({ name: course.mentor.name, _id: course.mentor._id })
    setName(course.name)
    setDescription(course.description)
    setCategory(course.category)
    setPrice(course.price)
    setSeats(course.seats)
    setStudents(course.students)
    setStartDate(new Date(course.start_date))
    SetPublished(course.published)
    setVideoUrl(course.video_path)
    setImageLable(course.img_path)
    setTitleWithAnswer(course.info_list)
    setWeeks(course.weeks)
  }

  const _FilterUsers = (users, role) => {
    if (role == 'MentorUser') {
      return users.filter(
        (user) => user.user_type == role || user.user_type == 'AdminUser'
      )
    }
    return users.filter((user) => user.user_type == role)
  }

  // select student
  const _handleSelectStudent = () => {
    let item
    let exist = false
    // find the user id
    let student = StudentsList.filter((item) => item.name === selectedStudent)
    // console.log('after filtering : ', students.length&&students[0]._id);
    for (item of students) {
      if (item._id === student[0]._id) {
        //console.log('existing item ' , item.name);
        exist = true
      }
    }
    if (exist) setSelectStudentErr('Student Already Selected')
    else {
      if (students.length < Number(seats))
        setStudents([
          ...students,
          { name: student[0].name, _id: student[0]._id }
        ])
      else {
        setSelectStudentErr('Seats available are only ' + seats)
      }
    }

    //console.log(selectStudentErr,student);
  }

  const _handleUnselectStudent = (id) => {
    let NewStudents = students.filter((item) => item._id !== id)
    setStudents(NewStudents)
    //console.log('student removed ');
  }

  // select mentor
  const _handleSelectMentor = (arr) => {
    setMentor({ _id: arr[0], name: arr[1] })
  }

  // close video
  const handleCloseVideo = () => {
    setShowVideo(false)
  }
  const handleOpenVideo = () => {
    setShowVideo(true)
  }

  /********************* ************/
  /* Field Section */

  const [title, setTitle] = useState('')
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), content: '' }
  ])

  const [titleWithAnswer, setTitleWithAnswer] = useState([])
  console.log('TitleWithAnswer', course, titleWithAnswer)

  const addtitleWithAnswer = () => {
    setTitleWithAnswer([
      ...titleWithAnswer,
      {
        title: title,
        items: [...inputFields]
      }
    ])
    setTitle('')
    setInputFields([{ id: uuidv4(), content: '' }])
  }

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i
    })

    setInputFields(newInputFields)
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), content: '' }])
  }

  const handleRemoveFields = (id) => {
    const values = [...inputFields]
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    )
    setInputFields(values)
  }

  //handle form submit
  const submitHandler = (e) => {
    e.preventDefault()

    let infoData = []
    if (titleWithAnswer.length) {
      titleWithAnswer.forEach((item) => {
        infoData.push(item)
      })
      dispatch(
        updateCourse(
          { info_list: infoData, name: name, video_path: VideoUrl },
          course._id
        )
      )
    }
  }

  useEffect(() => {
    if (course.name) {
      _setDefaultValuse()
    }

    if (users && users.length) {
      setStudentsList(_FilterUsers(users, 'StudentUser'))
      setMentorsList(_FilterUsers(users, 'MentorUser'))
    }
  }, [course, users])

  const _handleupdateCourse = () => {
    // set array for students ids
    let StudentsIds = []
    if (students.length) {
      students.forEach((item) => {
        StudentsIds.push(item._id)
      })
    }
    //const infoData = { infoList:  }

    //console.log('StudentsIds',StudentsIds);
    var form_data = new FormData()
    form_data.append('img_path', ImageUrl)
    form_data.append('_id', course._id)
    form_data.append('name', name)
    form_data.append('description', description)
    form_data.append('category', category)
    form_data.append('video_path', VideoUrl)
    form_data.append('seats', seats)
    form_data.append('weeks', weeks)
    form_data.append('mentor', Mentor._id)
    form_data.append('students', JSON.stringify(StudentsIds))
    form_data.append('price', price)
    form_data.append('start_date', startDate)
    form_data.append('published', course.published)
    //form_data.append('des_List',infoData)
    //console.log(infoData);
    dispatch(updateCourse(form_data, course._id))
  }
  return (
    <>
      {/* <!-- Edit Cource Section --> */}
      <div className="edit-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <h4>Edit Courses</h4>
              </div>
              <div className="pull-right">
                <a href="/mentor-courses-list" className="see-all">
                  Add Content
                </a>
              </div>
            </div>
          </div>
          <div>
            {error ? (
              <p className="text-danger bg-light p-2 ">{error}</p>
            ) : UpdateSuccess ? (
              <p className="text-success bg-light p-2 ">
                Course Updated successfully
              </p>
            ) : null}
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              {/* Left Column */}
              <div className="left-column col-lg-8 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h6>Basic Information</h6>
                  {/* Edit Course Form */}
                  <div className="edit-course-form">
                    <form method="post" action="index.html">
                      {/* Form Group */}
                      <div className="form-group">
                        <label>Course Title</label>
                        <input
                          type="text"
                          name="course-title"
                          defaultValue
                          placeholder="Course Title"
                          value={name}
                          required
                          onChange={(e) => {
                            setName(e.target.value)
                          }}
                        />
                      </div>

                      {/* descriptopn  */}
                      <div className="form-group">
                        <label>Description</label>
                        <span className="support"></span>
                        <textarea
                          name="message"
                          placeholder="Shortly describe this course"
                          defaultValue={description}
                          onChange={(e) => {
                            setDescription(e.target.value)
                          }}
                        />
                      </div>

                      <div className="form-group mb-2">
                        <label> Categogy</label>

                        {/* <span className="select-category">Select a category</span> */}
                        <select
                          className="custom-select-box px-2 ml-2"
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="" disabled selected>
                            select an option
                          </option>

                          <option>React </option>

                          <option>Node </option>

                          <option>Front End Development </option>

                          <option>Web Development </option>
                        </select>
                      </div>

                      <div className="my-3">
                        <span className="rounded-pill  px-2 py-1 m-2 bg-light">
                          <i class="fas fa-plus-circle text-success"></i>{' '}
                          {category}
                        </span>
                      </div>

                      {/* Form Group */}
                      <div className="inner-container">
                        <div className="row clearfix">
                          {/* Left Column */}
                          <div className="left-column col-lg-7 col-md-12 col-sm-12">
                            <div className="inner-column">
                              {/* Edit Course Form */}
                              <div className="edit-course-form">
                                <form>
                                  <h6>Add Describtion Info List</h6>
                                  <div className="form-group">
                                    <label>List Title</label>
                                    <input
                                      type="text"
                                      placeholder="Title"
                                      name="title"
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                    />
                                  </div>
                                  {inputFields.map((inputField, index) => (
                                    <Card key={inputField.id}>
                                      <div style={{ display: 'flex' }}>
                                        <div className="form-group form-group col-lg-7 col-md-12 col-sm-12">
                                          <label>{`Item ${1 + index}`} </label>
                                          <input
                                            type="text"
                                            placeholder="Write Item text"
                                            name="content"
                                            value={inputField.content}
                                            onChange={(event) =>
                                              handleChangeInput(
                                                inputField.id,
                                                event
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          fontSize: '30px',
                                          display: 'flex',
                                          width: '70px',
                                          justifyContent: 'space-between',
                                          margin: '0 auto'
                                        }}
                                      >
                                        <button
                                          type="button"
                                          onClick={handleAddFields}
                                        >
                                          <i class="fas fa-plus-square"></i>
                                        </button>
                                        <button
                                          type="button"
                                          disabled={inputFields.length === 1}
                                          onClick={() =>
                                            handleRemoveFields(inputField.id)
                                          }
                                        >
                                          <i class="fas fa-minus-square"></i>
                                        </button>
                                      </div>
                                    </Card>
                                  ))}

                                  <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                                    <div
                                      className="theme-btn btn-style-two"
                                      onClick={addtitleWithAnswer}
                                    >
                                      <span className="txt">
                                        Add List{' '}
                                        <i className="fa fa-angle-right" />
                                      </span>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          {/* Right Column */}
                          <div className="right-column col-lg-4 col-md-12 col-sm-12">
                            <div className="inner-column">
                              <div className="edit-course-form">
                                {/* Form Group */}
                                <div className="form-group">
                                  <h6>INFO LIST</h6>

                                  <Accordion
                                    className="accordion-box style-two"
                                    defaultActiveKey="0"
                                  >
                                    {titleWithAnswer &&
                                      titleWithAnswer.map((x, index) => (
                                        <Card className="accordion block">
                                          <Card.Header>
                                            <Accordion.Toggle
                                              variant="link"
                                              eventKey={`${index}`}
                                            >
                                              {x.title}
                                            </Accordion.Toggle>
                                          </Card.Header>
                                          <Accordion.Collapse
                                            eventKey={`${index}`}
                                          >
                                            <Card.Body>
                                              {x.items.map((answer) => (
                                                <div>{answer.content}</div>
                                              ))}
                                            </Card.Body>
                                          </Accordion.Collapse>
                                        </Card>
                                      ))}
                                  </Accordion>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*  bootcamp sections  */}

                      <div className="form-group">
                        <button
                          type="button"
                          className="theme-btn btn-style-two"
                          onClick={submitHandler}
                        >
                          <span className="txt">Add Section</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Right Column */}
              <div className="right-column col-lg-4 col-md-12 col-sm-12">
                <div className="inner-column">
                  <h6>Video & Image</h6>
                  {/* Video Box */}
                  <div
                    className="video-boxed"
                    style={{
                      backgroundImage: 'url(images/resource/video-image-3.jpg)'
                    }}
                  >
                    <a
                      onClick={() => {
                        handleOpenVideo()
                      }}
                      className="lightbox-image intro-video-box"
                    >
                      <span className="fa fa-play">
                        <i className="ripple" />
                      </span>
                    </a>
                  </div>
                  {/* video Modal */}
                  <Modal
                    show={showVideo}
                    onHide={handleCloseVideo}
                    size="lg"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Watch Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className=" m-auto">
                      {/* {(AddnewCourseErr|| AddError)&&<Message variant="danger">{AddnewCourseErr||AddError}</Message>} */}
                      <ReactPlayer url={VideoUrl} controls></ReactPlayer>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                  </Modal>
                  {/* End Video Box */}

                  {/* Url Box */}
                  <div className="url-boxed">
                    <label>Video URL</label>
                    <input
                      type="url"
                      name="videoUrl"
                      value={VideoUrl}
                      placeholder="https://www.youtube.com/dummy-video.com"
                      required
                      onChange={(e) => {
                        setVideoUrl(e.target.value)
                      }}
                    />
                    <span className="valid">Enter valid url address</span>

                    {/* Divider */}
                    <div className="border my-3"></div>
                    {/* ******************* */}
                    <label>Image URL</label>
                    {ImageLable ? (
                      <img
                        src={
                          'http://localhost:5001/uploads/Bootcamp/' + ImageLable
                        }
                      />
                    ) : (
                      <p className="text-warning bg-light p-1">
                        * No Image Uploaded
                      </p>
                    )}
                    <span className="valid mb-3">
                      Select (jpg / png )image{' '}
                    </span>
                    <div className="input-group ">
                      <input
                        type="file"
                        onChange={(e) => {
                          setImageLable(e.target.files[0].name)
                          setImageUrl(e.target.files[0])
                          setUpdateErr('')
                        }}
                        className="form-control"
                        id="inputGroupFile02"
                      />
                    </div>
                  </div>

                  <div className=""></div>
                  {/* End Url Box */}

                  <h6>Options</h6>
                  <div className="option-cource-box">
                    <div className="box-inner">
                      <div className="form-group mb-2">
                        <label> Mentor</label>
                        {!MentorsList.length && (
                          <p className="text-warning bg-light p-1">
                            * There is no Mentor Users
                          </p>
                        )}
                        {/* <span className="select-category">Select a category</span> */}
                        <select
                          className="custom-select-box px-2"
                          onChange={(e) => {
                            _handleSelectMentor(e.target.value.split(','))
                          }}
                        >
                          <option value="" disabled selected>
                            Choose Mentor{' '}
                          </option>
                          {MentorsList.length &&
                            MentorsList.map((mentor) => {
                              return (
                                <option value={[mentor._id, mentor.name]}>
                                  {mentor.name}
                                  {mentor.user_type == 'AdminUser' &&
                                    ' (Admin)'}
                                </option>
                              )
                            })}
                        </select>

                        <div className="my-3">
                          {Mentor.name ? (
                            <span className="rounded-pill  px-2 py-1 m-2 bg-light">
                              <i class="fas fa-plus-circle text-success"></i>{' '}
                              {Mentor.name}
                            </span>
                          ) : (
                            <p className="text-warning bg-light p-1">
                              * Nothing Selected
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border my-3"></div>
                      {/* ******************* */}
                      <div className="form-group ">
                        <label htmlFor="exampleDataList" className="form-label">
                          Students
                        </label>
                        {/* error message */}
                        {selectStudentErr && (
                          <p className="text-danger bg-light p-1">
                            {selectStudentErr}
                          </p>
                        )}
                        <input
                          className="form-control bg-light"
                          list="datalistOptions"
                          id="exampleDataList"
                          placeholder="search student..."
                          onChange={(e) => {
                            setSelectStudentErr('')
                            setSelectedStudent(e.target.value)
                          }}
                          value={selectedStudent}
                        />

                        <button
                          type="button"
                          className="btn btn-success py-2 px-4 mt-2"
                          onClick={_handleSelectStudent}
                        >
                          add
                        </button>

                        <datalist id="datalistOptions">
                          {StudentsList.length &&
                            StudentsList.map((student) => {
                              return (
                                <option
                                  data={student._id}
                                  value={student.name}
                                  key={student._id}
                                >
                                  {student.email}
                                </option>
                              )
                            })}
                        </datalist>
                      </div>
                      <label className="mt-2">
                        Selected Students : {students.length}/
                        {StudentsList.length}
                      </label>
                      <div className="my-3">
                        {students.length ? (
                          students.map((student) => {
                            return (
                              <span className="rounded-pill  px-2 py-1  my-1 d-inline-block text-truncate bg-light">
                                <a
                                  onClick={() => {
                                    _handleUnselectStudent(student._id)
                                  }}
                                >
                                  <i class="fas fa-minus-circle text-danger  cursor- pointer"></i>
                                </a>{' '}
                                {student.name}
                              </span>
                            )
                          })
                        ) : (
                          <p className="text-warning bg-light p-1">
                            * Nothing Selected
                          </p>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="border my-3"></div>
                      {/* ******************* */}
                      <div className="form-group">
                        <span className="price">price</span>
                        <div className="total-price">Set Course Price :</div>
                        <div className="item-quantity">
                          <input
                            className="quantity-spinner"
                            type="number"
                            defaultValue={price}
                            name="quantity"
                            onChange={(e) => {
                              setPrice(e.target.value)
                            }}
                          />
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border my-3"></div>
                      {/* ******************* */}
                      <div className="form-group">
                        <span className="price">seats</span>
                        <div className="total-price">Set Course seats :</div>
                        <div className="item-quantity">
                          <input
                            className="quantity-spinner"
                            type="number"
                            min="0"
                            defaultValue={seats}
                            name="quantity"
                            onChange={(e) => {
                              setSeats(e.target.value)
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <span className="price">weeks</span>
                        <div className="total-price">Set Course weeks :</div>
                        <div className="item-quantity">
                          <input
                            className="quantity-spinner"
                            type="number"
                            min={1}
                            defaultValue={weeks}
                            name="quantity"
                            onChange={(e) => {
                              setWeeks(e.target.value)
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <span className="price">start date</span>
                        <div className="total-price">Set Course starts :</div>
                        <div className="item-quantity">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          ></DatePicker>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Button Box */}
                  <div className="button-box text-center">
                    <button
                      type="button"
                      className="theme-btn btn-style-one"
                      style={{ zIndex: '0' }}
                    >
                      <span className="txt" onClick={_handleupdateCourse}>
                        Save Changes
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Manage Cource Section */}
    </>
  )
}
