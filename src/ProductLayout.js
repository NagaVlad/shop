import React, { createRef } from 'react'
import './App.css'
import ProductItem from './ProductItem'
import { connect } from 'react-redux'

class ProductLayout extends React.Component {
  render() {
    //
    var x = []
    var o = this.props.offset
    var p = this.props.perPage
    x = [...this.props.filtredByNameData].slice(o, o + p)

    console.log('??????????', x);
    return (
      <div className='row'>
        <div className='container'>
          <h3 style={{ textAlign: 'center', color: 'black' }}>Товары</h3>

          {/* {console.log('-----------------------', this.props)} */}
          {/* <h1>{x.map((el, index) => {
            return (
              <p key={index}>{el.name}</p>
            )
          })}</h1> */}


          {/* {x.map((pd, index) => { */}
          {x.map((pd, index) => {
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
    checkedFilter: state.appReducer.checkedFilter,
    offset: state.appReducer.offset,
    perPage: state.appReducer.perPage
  };
}

export default connect(mapStateToProps)(ProductLayout);
