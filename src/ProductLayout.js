import React, { createRef } from 'react'
import './App.css'
import ProductItem from './ProductItem'
import { connect } from 'react-redux'

class ProductLayout extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='container'>
          <h3 style={{ textAlign: 'center', color: 'black' }}>Товары</h3>
          {this.props.filtredByNameData.map((pd, index) => {
            return (
              <ProductItem
                pd={pd}
                key={pd.id}
              />
            )
          })}
        </div>
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

export default connect(mapStateToProps)(ProductLayout);
