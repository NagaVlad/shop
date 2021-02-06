import {
   ADD, ADD2, SHOW, SHOW2,
   CLOSE, CLOSE2, GET_DATA_AND_FILTRED,
   ADD_TO_CART, CHANGE_FILTER_BY_NAME,
   CHANGE_FILTER_FLAG,
   CHANGE_PRODUCT_ITEM_CHECKED_STATUS,
   SET_CURRENTPAGE, SET_OFFSET,
   SET_TOTAL, CHANGE_IS_EMPTY
} from './actionTypes'
// export function add2(number) {
export function add() {
   return {
      type: ADD
      // payload: number
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
   console.log('ЭТО ACTION pauyload', data);
   return (dispatch) => {
      dispatch({
         type: GET_DATA_AND_FILTRED,
         payload: [...data]
      })
   }
}

export function addToCart(data) {
   console.log('ЭТО ACTION pauyload', data);
   return (dispatch) => {
      dispatch({
         type: ADD_TO_CART,
         payload: data
      })
   }
}
export function changeFiltredByNameData(data) {
   console.log("DATAAAAAA", data);
   return (dispatch) => {
      dispatch({
         type: CHANGE_FILTER_BY_NAME,
         payload: [...data]
      })
   }
}
export function changeFilterFlag(data) {
   console.log("МЕНЯЮ ФЛАГ");
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

// export function cnahgeIsEmpty() {
//    return (dispatch) => {
//       dispatch({
//          type: CHANGE_IS_EMPTY,
//       })
//    }
// }


// export function changeProductItemCheckedStatus(data) {
//    console.log('ПРИШЛА ДАТА С КОРЗИНЫ', data);
//    console.log("УДАЛЯЕМ ПО КНОПКЕ!!!!!!!!!!!!");
//    const { id, isChecked, input } = data
//    return (dispatch, getState) => {
//       dispatch(() => {
//          console.log(getState().appReducer);
//          console.log('УДАЛИЛ', getState().appReducer.data);
//          const productItem = getState().appReducer.data.find((el) => el.id === id);
//          productItem.isChecked = isChecked;
//          if (isChecked) {
//             getState().appReducer.cart.push(productItem);
//          } else {
//             const index = getState().appReducer.cart.indexOf(productItem);
//             if (index > -1) {
//                getState().appReducer.cart.splice(index, 1);
//             }
//          }
//          console.log(('КОРЗИНО', getState().appReducer.cart));
//          dispatch(addToCart(getState().appReducer.cart))
//       })
//    }
// }





