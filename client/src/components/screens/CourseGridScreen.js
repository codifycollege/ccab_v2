import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getCourseList } from '../../redux/actions/courseAction'
import Message from '../layout/Message'
import Loader from '../layout/Loader'

export default function CourseGridScreen({ match }) {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState([])

  const coursesPerPage = 3

  const { userDetail } = useSelector((state) => state.userLogin)

  const { courseList, loading, error } = useSelector(
    (state) => state.courseList
  )

  /*******************Functions *************/
  const categoryArray = [...new Set(courseList.map((item) => item.category))]

  const categoryCourses = (category) => {
    const filteredCourses = courseList.filter(
      (couser) => couser.category === category
    )

    const found = currentPage.find((el) => el.category === category)

    let indexOfLastCourse

    found
      ? (indexOfLastCourse = found.pageNumber * coursesPerPage)
      : (indexOfLastCourse = 1 * coursesPerPage)

    const currentCourses = filteredCourses.slice(
      indexOfLastCourse - coursesPerPage,
      indexOfLastCourse
    )

    return currentCourses
  }

  const pagination = (category) => {
    const filteredCourses = courseList.filter(
      (couser) => couser.category === category
    )

    let pageNumbers = []

    for (
      let i = 1;
      i <= Math.ceil(filteredCourses.length / coursesPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  const paginate = (category, pageNumber) => {
    const found = currentPage.map((el) =>
      el.category !== category ? el : { ...el, pageNumber }
    )

    setCurrentPage(found)
  }

  const findPageNumber = (category) =>
    currentPage.length &&
    currentPage.find((page) => page.category === category).pageNumber

  useEffect(() => {
    dispatch(getCourseList())
  }, [dispatch])

  useEffect(() => {
    const currentCoursesArray = []
    categoryArray.map((course) => {
      currentCoursesArray.push({ category: course, pageNumber: 1 })
    })

    setCurrentPage(currentCoursesArray)
  }, [courseList])

  return (
    <>
      {/*End Page Title*/}
      {/*Sidebar Page Container */}
      <div className="sidebar-page-container">
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-1.png)' }}
        ></div>
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-2.png)' }}
        ></div>
        <div className="circle-one"></div>
        <div className="circle-two"></div>
        <div className="auto-container">
          <div className="row clearfix">
            {/* Content Side  */}
            <div className="content-side col-lg-12 col-md-12 col-sm-12">
              <div className="our-courses">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message>{error}</Message>
                ) : categoryArray.length ? (
                  categoryArray.map((category) => {
                    return (
                      <div>
                        {/* Options View  */}
                        <div className="options-view">
                          <div className="clearfix">
                            <div className="pull-left">
                              <h3>{category}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="row clearfix">
                          {categoryCourses(category).length &&
                            categoryCourses(category).map((course) => {
                              return (
                                <div
                                  className="cource-block-two col-lg-4 col-md-6 col-sm-12"
                                  key={course._id}
                                >
                                  <div className="inner-box">
                                    <div className="image">
                                      <Link to={`/courses/${course._id}`}>
                                        <img
                                          src={
                                            'http://localhost:5001/uploads/Bootcamp/' +
                                            course.img_path
                                          }
                                          alt=""
                                        />
                                      </Link>
                                    </div>
                                    <div className="lower-content">
                                      <h5>
                                        <Link to={`/courses/${course._id}`}>
                                          {course.name}
                                        </Link>
                                      </h5>
                                      <div className="text">
                                        <span
                                          className="d-inline-block text-truncate"
                                          style={{ maxWidth: '240px' }}
                                        >
                                          {course.description}
                                        </span>
                                      </div>
                                      <div className="clearfix">
                                        <div className="pull-left">
                                          <div className="students">
                                            {course.weeks * 5} Lectures
                                          </div>
                                        </div>
                                        <div className="pull-right">
                                          <div className="hours">
                                            {course.weeks * 5 * 2} Hours
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>

                        {/* Pagination  */}
                        <div className="styled-pagination">
                          <ul className="clearfix">
                            <li className="prev">
                              <a
                                onClick={() => {
                                  const pageNumber = findPageNumber(category)
                                  pageNumber !== 1 &&
                                    paginate(category, pageNumber - 1)
                                }}
                              >
                                <span className="fa fa-angle-left"></span>{' '}
                              </a>
                            </li>
                            {pagination(category).map((pageNumber) => {
                              return (
                                <li
                                  key={pageNumber}
                                  className={
                                    findPageNumber(category) === pageNumber &&
                                    'active'
                                  }
                                >
                                  <a
                                    onClick={() =>
                                      paginate(category, pageNumber)
                                    }
                                  >
                                    {pageNumber}
                                  </a>
                                </li>
                              )
                            })}

                            <li className="next">
                              <a
                                onClick={() => {
                                  const pageNumber = findPageNumber(category)
                                  categoryCourses(category).length === 3 &&
                                    paginate(category, pageNumber + 1)
                                }}
                              >
                                <span className="fa fa-angle-right"></span>{' '}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses  */}
      <section className="popular-courses-section sidebar-page-container">
        <div
          className="patern-layer-one paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-1.png)' }}
        ></div>
        <div
          className="patern-layer-two paroller"
          data-paroller-factor="0.40"
          data-paroller-factor-lg="-0.20"
          data-paroller-type="foreground"
          data-paroller-direction="vertical"
          style={{ backgroundImage: 'url(images/icons/icon-2.png)' }}
        ></div>
        <div className="auto-container">
          <div className="sec-title">
            <h2>Most Popular Courses</h2>
          </div>
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className="row clearfix">
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message>{error}</Message>
                ) : courseList.length ? (
                  <div className="cource-block-two col-lg-4 col-md-6 col-sm-12">
                    <div
                      className="inner-box wow fadeInLeft"
                      data-wow-delay="0ms"
                      data-wow-duration="1500ms"
                    >
                      <div className="image">
                        <Link to="/course/1/details">
                          <img
                            src={
                              'http://localhost:5001/uploads/Bootcamp/' +
                              courseList[0].img_path
                            }
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="lower-content">
                        <h5>
                          <Link to="/course/1/details">
                            {courseList[0].name}
                          </Link>
                        </h5>
                        <div className="text">
                          <span
                            className="d-inline-block text-truncate"
                            style={{ maxWidth: '240px' }}
                          >
                            {courseList[0].description}
                          </span>
                        </div>
                        <div className="clearfix">
                          <div className="pull-left">
                            <div className="students">
                              {courseList[0].weeks * 5} Lectures
                            </div>
                          </div>
                          <div className="pull-right">
                            <div className="hours">
                              {courseList[0].weeks * 5 * 2} Hours
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Popular Courses  */}
    </>
  )
}
