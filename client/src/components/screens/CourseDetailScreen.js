import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getCourseDetails,
  deleteCourse,
  createCourse
} from '../../redux/actions/courseAction'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import { Link } from 'react-router-dom';

export default function CourseDetailScreen({ match }) {
  const ID = match.params.id
  const dispatch = useDispatch()

  // user must be logged in before!!!
  const userLogin = useSelector((state) => state.userLogin)
  const { userDetail } = userLogin

  const { course, loading, error } = useSelector((state) => state.courseDetails)
  
  useEffect(() => {
    dispatch(getCourseDetails(ID))
    console.log(course);
  }, [dispatch, ID])

  console.log(course)

  return (
    <>
      {/* Intro Courses */}
      <section className="intro-section">
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

        <div className="auto-container">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : course.name ? (
            <div>
              <div className="sec-title">
                <h2>{course.name}</h2>
              </div>

              <div className="inner-container">
                <div className="row clearfix">
                  {/* Content Column */}
                  <div className="content-column col-lg-8 col-md-12 col-sm-12">
                    <div className="inner-column">
                      {/* Intro Info Tabs*/}
                      <div className="intro-info-tabs">
                        {/* Intro Tabs*/}
                        <div className="intro-tabs tabs-box">
                          {/*Tab Btns*/}
                          <ul className="tab-btns tab-buttons clearfix">
                            <li
                              data-tab="#prod-overview"
                              className="tab-btn active-btn"
                            >
                              Overview
                            </li>
                           
                          </ul>

                          {/*Tabs Container*/}
                          <div className="tabs-content">
                            {/*Tab / Active Tab*/}
                            <div className="tab active-tab" id="prod-overview">
                              <div className="content">
                                {/* Cource Overview */}
                                <div className="course-overview">
                                  <div className="inner-box">   
                                  <h4>About the Course</h4>
                                    <p>{course.description}</p>
                                 
                                    
                                    <ul className="student-list">
                                      <li className="text-dark bg-warning p-2 rounded ">{course.seats - course.students.length} Seats available</li>
                                      <li className="text-dark bg-success p-2 rounded ">{course.weeks*5} lectures </li>
                                    </ul>
                                    {course.info_list.length?
                                    course.info_list.map((item)=>{
                                      return(
                                        <>
                                        <h3>{item.title}</h3>
                                        <ul className="review-list">
                                         { item.items.map((itemList)=>{
                                            return(
                                              <li>{itemList.content}</li>
                                            )
                                          })}
                                        </ul>
                                        </>
                                      )
                                    }):<p className="p-2 text-warning">There is no Requirements</p>}
                 
                        
                                  </div>
                                </div>
                              </div>
                            </div>

                         

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Column */}
                  <div className="video-column col-lg-4 col-md-12 col-sm-12">
                    <div className="inner-column sticky-top">
                      {/* Video Box */}
                      <div
                        className="intro-video"
                        style={{
                          backgroundImage:
                            'url(http://localhost:5001/uploads/Bootcamp/'+course.img_path+')'
                        }}
                      >
                        <a
                          href="https://www.youtube.com/watch?v=kxPCFljwJws"
                          className="lightbox-image intro-video-box"
                        >
                          <span className="fa fa-play">
                            <i className="ripple"></i>
                          </span>
                        </a>
                        <h4>Preview this course</h4>
                      </div>
                      {/* End Video Box */}
                      <div className="price">${course.price}</div>
                      <div className="time-left">
                        23 hours left at this price!
                      </div>

                      <Link to={`/checkout/${course._id}`} className="theme-btn btn-style-three">
                        <span className="txt">
                          Enroll now <i className="fa fa-angle-right"></i>
                        </span>
                      </Link>
                
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      {/* End intro Courses */}

      {/* Call To Action Section Two */}
      {!userDetail.token ? (
        <section
          className="call-to-action-section-two"
          style={{ backgroundImage: 'url(images/background/3.png)' }}
        >
          <div className="auto-container">
            <div className="content">
              <h2 className=" text-dark">Ready to get started?</h2>
              <div className="text text-dark">
                Replenish him third creature and meat blessed void a fruit
                gathered you’re, they’re two <br /> waters own morning gathered
                greater shall had behold had seed.
              </div>
              <div className="buttons-box">
                <a href="/get-start" className="theme-btn btn-style-one">
                  <span className="txt">
                    Get Stared <i className="fa fa-angle-right"></i>
                  </span>
                </a>
                <a href="/courses-grid" className="theme-btn btn-style-two">
                  <span className="txt">
                    All Courses <i className="fa fa-angle-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {/* End Call To Action Section Two */}
    </>
  )
}
