import React from "react";
import { connect } from "react-redux";
import { addToCart } from './redux/actions/actions'

export function changeProductItemCheckedStatus({ id, isChecked, input }, props) {


   // console.log('props', props);
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

   ////////////////////////////////////
   let total = props.cart.reduce((acc, currentValue) => {
      console.log('acc', acc);
      console.log('currentValue', currentValue);
      return Number(acc) + Number(currentValue.id);
   }, 0)

   console.log('ТОТАЛ_____', total);

   props.setTotal(total)
   // console.log('props.cart', props.cart);
   // console.log('ТОТАЛ_____-', total);

   ////////////////////////////////////

   input.current && (input.current.checked = isChecked);
};






