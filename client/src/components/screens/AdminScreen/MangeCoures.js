import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getCourseListForAdmin,
  updateCourse,
  createCourse,
  deleteCourse
} from './../../../redux/actions/courseAction'
import Message from './../../layout/Message'
import Loader from './../../layout/Loader'
import { OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap'
import { Table, Col, Row, Modal, Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

export default function MangeCourse({ match }) {
  const dispatch = useDispatch()

  const pageNumber = match.params.pageNumber || 1

  /***********   Calling Reducer  ***************/

  // Admin course list Reducer
  const { loading: Deleteloading, error: DeleteError } = useSelector(
    (state) => state.courseDelete
  )
  const { loading: Updateloading, error: UpdateError } = useSelector(
    (state) => state.courseUpdate
  )

  // Admin course list Reducer
  const { courseList, page, pages, loading, error } = useSelector(
    (state) => state.AdminCourseList
  )

  // add course  Reducer
  const {
    loading: Addloading,
    error: AddError,
    success: AddSuccess
  } = useSelector((state) => state.courseCreate)
  /************************************************************** */

  /************* Functions *************/
  // tooltip function
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Publish
    </Tooltip>
  )

  const renderTooltipWithHold = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Withhold
    </Tooltip>
  )

  // get date format
  const getDate = (date) => {
    let d = new Date(date)
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  }

  // count the current week for each course
  const getWeeksLeft = (StartDate) => {
    let d = new Date(StartDate)
    let timePassed = new Date().getTime() - d.getTime()
    return Math.ceil(timePassed / 1000 / 60 / 60 / 24 / 7)
  }

  /* delete couse handlers  */
  const handleCloseDelete = () => setShow(false)
  const handleShowDelete = () => setShow(true)

  /* add course handles */
  const handleCloseAdd = () => {
    setShowAdd(false)
    setWeeks('')
    setAddnewCourseErr('')
    dispatch({ type: 'COURSE_ADD_RESET' })
  }

  const handleShowAdd = () => setShowAdd(true)
  // add course  function
  const _addBootcampHandler = () => {
    if (!weeks) {
      setAddnewCourseErr('weeks should not be empty')
    } else {
      dispatch(createCourse({ weeks: weeks }))
      dispatch(getCourseListForAdmin(pageNumber))
      setWeeks('')
      handleCloseAdd()
    }
  }

  // publish course
  const publishhnadler = (course) => {
    //console.log({...course , published:true,});
    dispatch(
      updateCourse(
        {
          ...course,
          students: JSON.stringify(course.students),
          published: true
        },
        course._id
      )
    )
    dispatch(getCourseListForAdmin(pageNumber))
  }

  // Withhold  course
  const WithholdHnadler = (course) => {
    //console.log({...course , published:true,});
    dispatch(
      updateCourse(
        { name: course.name, video_path: course.video_path, published: false },
        course._id
      )
    )
    dispatch(getCourseListForAdmin(pageNumber))
  }

  /**************************************************************** */

  useEffect(() => {
    dispatch(getCourseListForAdmin(pageNumber))
  }, [dispatch, pageNumber, AddSuccess])

  /*******************  State ********************* */
  /* to show delete course model */
  const [show, setShow] = useState(false)

  /* to show add course model */
  const [showAdd, setShowAdd] = useState(false)

  const [weeks, setWeeks] = useState('')
  const [AddnewCourseErr, setAddnewCourseErr] = useState('')
  // item id
  const [DeletedCourse, setDeletedCourse] = useState('')
  //console.log(DeletedCourse);

  /************************************************** */

  //console.log(courseList);
  return (
    <>
      {/* Manage Cource Section */}
      <div className="manage-cource-section">
        <div className="auto-container">
          {/* Sec Title */}
          <div className="sec-title">
            <div className="clearfix">
              <div className="pull-left">
                <h4>Manage Courses</h4>
              </div>
              <div className="pull-right ">
                {/* Add couse Button */}
                <a
                  href="#"
                  className="btn btn-danger bordered "
                  onClick={handleShowAdd}
                >
                  {Addloading ? (
                    <>
                      {' '}
                      <span className="mx-1">Adding</span>
                      <Spinner animation="border" role="status" size="sm">
                        <span className="sr-only">Loading...</span>
                      </Spinner>{' '}
                    </>
                  ) : (
                    'Add Course'
                  )}
                </a>

                <Modal show={showAdd} onHide={handleCloseAdd}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add New Course</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {(AddnewCourseErr || AddError) && (
                      <Message variant="danger">
                        {AddnewCourseErr || AddError}
                      </Message>
                    )}

                    <label className="d-block">
                      Enter the total weeks to the new course :
                    </label>
                    <input
                      type="number"
                      value={weeks}
                      className="border py-2"
                      onChange={(e) => {
                        setAddnewCourseErr('')
                        setWeeks(e.target.value)
                      }}
                    />
                    <p>You need to update the course after you add it!</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                      Close
                    </Button>
                    <Button variant="danger" onClick={_addBootcampHandler}>
                      Ok
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>

          <div className="inner-container">
            <div className="container-content">
              {UpdateError ? <p className="">{UpdateError}</p> : null}
              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>
                      <h5>Title</h5>
                    </th>
                    <th>
                      <h5>Start Date</h5>
                    </th>
                    <th>
                      <h5>Weeks</h5>
                    </th>
                    <th>
                      <h5>Status</h5>
                    </th>
                    <th>
                      <h5>Action</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message>{error}</Message>
                    ) : courseList.length ? (
                      courseList.map((item) => {
                        //console.log(item);
                        return (
                          <tr>
                            <th className="title" scope="col">
                              {item.name}
                            </th>
                            <th className="post-date" scope="col">
                              {getDate(item.start_date)}
                            </th>
                            <th className="sales" scope="col">
                              {getWeeksLeft(item.start_date)}/{item.weeks}
                            </th>

                            <th className="category" scope="col">
                              {item.published ? (
                                <span className="text-success">Published</span>
                              ) : (
                                <span className="text-danger">
                                  Not Published
                                </span>
                              )}
                            </th>
                            <th className="actions" scope="col">
                              <Link to={'/admin-coure-update/' + item._id}>
                                <i class="fas fa-edit"></i>
                              </Link>

                              {/* delete course button */}
                              <a>
                                <i
                                  class="fas fa-trash-alt"
                                  onClick={() => {
                                    setDeletedCourse(item)
                                    handleShowDelete()
                                  }}
                                ></i>
                              </a>

                              <Modal show={show} onHide={handleCloseDelete}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Deleting Course</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{ color: 'red' }}>
                                  Are you sure to delete {DeletedCourse.name} ?
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleCloseDelete}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="danger"
                                    onClick={() => {
                                      dispatch(deleteCourse(DeletedCourse._id))

                                      toast.info(
                                        DeletedCourse.name +
                                          ' successfuly removed',
                                        {
                                          position: toast.POSITION.BOTTOM_RIGHT
                                        }
                                      )
                                      setShow(false)
                                      dispatch(
                                        getCourseListForAdmin(pageNumber)
                                      )
                                    }}
                                  >
                                    Ok
                                  </Button>
                                </Modal.Footer>
                              </Modal>

                              {/* publish Button and view button */}
                              {item.published ? (
                                <OverlayTrigger
                                  placement="bottom"
                                  text="Withhold"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={renderTooltipWithHold}
                                >
                                  <a
                                    onClick={() => {
                                      WithholdHnadler(item)
                                    }}
                                  >
                                    <i class="fas fa-minus-circle"></i>
                                  </a>
                                </OverlayTrigger>
                              ) : (
                                <>
                                  {/* Tool tips for publishing action */}
                                  <OverlayTrigger
                                    placement="bottom"
                                    text="Publish"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                  >
                                    <a
                                      onClick={() => {
                                        publishhnadler(item)
                                      }}
                                    >
                                      <i className="fas fa-upload"></i>
                                    </a>
                                  </OverlayTrigger>
                                </>
                              )}
                            </th>
                          </tr>
                        )
                      })
                    ) : null}
                  </>
                </tbody>
              </Table>
            </div>
          </div>
          {/* Post Share Options */}
          {/* Post Share Options */}
          <div className="styled-pagination">
            <ul className="clearfix">
              <li className="prev">
                <Link to={`/admin-page/${page > 1 ? page - 1 : 1}`}>
                  <span className="fa fa-angle-left"></span>{' '}
                </Link>
              </li>
              {[...Array(pages).keys()].map((x) => (
                <li className={x + 1 === page && 'active'}>
                  <Link key={x + 1} to={`/admin-page/${x + 1}`}>
                    {x + 1}
                  </Link>
                </li>
              ))}

              <li className="next">
                <Link to={`/admin-page/${page === pages ? page : page + 1}`}>
                  <span className="fa fa-angle-right"></span>{' '}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* End Manage Cource Section */}
      <ToastContainer />
    </>
  )
}
