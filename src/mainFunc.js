import React from "react";
import { connect } from "react-redux";
import { addToCart } from './redux/actions/actions'

export function changeProductItemCheckedStatus({ id, isChecked, input }, props) {
   console.log('props', props);
   // console.log((input.current.checked = isChecked))
   const productItem = props.data.find((el) => el.id === id);
   console.log('productItem', productItem);
   // const globalIndex = this.state.filtredByNameData.indexOf(productItem)
   productItem.isChecked = isChecked;
   if (isChecked) {
      props.cart.push(productItem);
   } else {
      const index = props.cart.indexOf(productItem);
      if (index > -1) {
         props.cart.splice(index, 1);
      }
   }
   props.addToCart(props.cart)

   input.current && (input.current.checked = isChecked);
};

// function mapStateToProps(state) {
//    return {
//       counter: state.counter1.counter,
//       modal: state.appReducer.modal,
//       modalReg: state.appReducer.modalReg,

//       data: state.appReducer.data,
//       filtredByNameData: state.appReducer.filtredByNameData,
//       cart: state.appReducer.cart,

//       checkedFilter: state.appReducer.checkedFilter
//    };
// }

// function mapDispatchToProps(dispatch) {
//    return {

//       addToCart: (data) => dispatch(addToCart(data)),
//    };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(changeProductItemCheckedStatus);
