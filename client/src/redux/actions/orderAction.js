import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL
} from '../constences/orderConst'

export const createOrder = (bootcampId, order) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })

    // Descruct from getState()
    const {
      userLogin: { userDetail }
    } = getState()
    const config = { headers: { Authorization: 'Bearer ' + userDetail.token } }

    const response = await axios.post(`/api/order/${bootcampId}`, order, config)

    // console.log("response:", response)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      //   payload: console.log("payload:", resconst response.data),
      payload: response.data
    })
  } catch (error) {
    console.log('error:', error)
    dispatch({
      type: ORDER_CREATE_FAIL,
      //    payload: error.res
      payload: error.response.data.message
    })
  }
}