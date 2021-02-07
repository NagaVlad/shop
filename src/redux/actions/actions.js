import {
   ADD, ADD2, SHOW, SHOW2,
   CLOSE, CLOSE2, GET_DATA_AND_FILTRED,
   ADD_TO_CART, CHANGE_FILTER_BY_NAME,
   CHANGE_FILTER_FLAG,
   CHANGE_PRODUCT_ITEM_CHECKED_STATUS,
   SET_CURRENTPAGE, SET_OFFSET,
   SET_TOTAL, CHANGE_IS_EMPTY
} from './actionTypes'

export function add() {
   return {
      type: ADD
   }
}
export function add2() {
   return {
      type: ADD2,
   }
}
export function showCart() {
   return {
      type: SHOW,
   }
}
export function showReg() {
   return {
      type: SHOW2,
   }
}
export function closeModal() {
   return {
      type: CLOSE,
   }
}
export function closeModal2() {
   return {
      type: CLOSE2,
   }
}
export function setDataFilter(data) {
   return (dispatch) => {
      dispatch({
         type: GET_DATA_AND_FILTRED,
         payload: [...data]
      })
   }
}

export function addToCart(data) {
   return (dispatch) => {
      dispatch({
         type: ADD_TO_CART,
         payload: data
      })
   }
}
export function changeFiltredByNameData(data) {
   return (dispatch) => {
      dispatch({
         type: CHANGE_FILTER_BY_NAME,
         payload: [...data]
      })
   }
}
export function changeFilterFlag(data) {
   return (dispatch) => {
      dispatch({
         type: CHANGE_FILTER_FLAG,
         payload: data
      })
   }
}
export function changeCurrentPaga(data) {
   return (dispatch) => {
      dispatch({
         type: SET_CURRENTPAGE,
         payload: data
      })
   }
}
export function changeOfsset(data) {
   return (dispatch) => {
      dispatch({
         type: SET_OFFSET,
         payload: data
      })
   }
}
export function setTotal(data) {
   return (dispatch) => {
      dispatch({
         type: SET_TOTAL,
         payload: data
      })
   }
}