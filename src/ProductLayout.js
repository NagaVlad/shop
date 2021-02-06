import React, { createRef } from 'react'
import './App.css'
import ProductItem from './ProductItem'
import { connect } from 'react-redux'

class ProductLayout extends React.Component {
  render() {
    return (
      <div className='row'>
        <h3 style={{ textAlign: 'center', color: 'black' }}>Товары</h3>

        {/* {this.props.slice.map((pd, index) => (
               <ProductItem
                  pd={pd}
                  key={index}
                  ref={this.props.arrayRef[pd.id]}
                  addCart={this.props.addCart}
               />
            ))} */}

        {/* {console.log('this.props.slice', this.props.slice)} */}
        {this.props.filtredByNameData.map((pd, index) => {
          return (
            <ProductItem
              pd={pd}
              key={pd.id}
              // isChecked={pd.isChecked}//!!УБРАЛИ
              addToCart={this.props.addToCart}
            // changeProductItemCheckedStatus={
            //   this.props.changeProductItemCheckedStatus
            // }
            />
          )
        })}

        {/* {console.log(this.props)} */}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    filtredByNameData: state.appReducer.filtredByNameData,
    data: state.appReducer.data,

    counter: state.counter1.counter,
    modal: state.appReducer.modal,
    modalReg: state.appReducer.modalReg,
    cart: state.appReducer.cart,
    checkedFilter: state.appReducer.checkedFilter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // onAdd: () => dispatch(add()),
    // showCart: () => dispatch(showCart()),
    // showReg: () => dispatch(showReg()),
    // setDataFilter: (data) => dispatch(setDataFilter(data)),
    // addToCart: (data) => dispatch(addToCart(data)),
    // changeFiltredByNameData: (data) => dispatch(changeFiltredByNameData(data)),
    // changeFilterFlag: (data) => dispatch(changeFilterFlag(data))
    // receivedData: prevState => dispatch(receivedData())
  };
}


export default connect(mapStateToProps)(ProductLayout, mapDispatchToProps);
// export default ProductLayout;