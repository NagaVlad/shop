import React from 'react'
import './App.css'
import ProductItem from './ProductItem'

export default class ProductLayout extends React.Component {


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
            {this.props.slice.map((pd, index) => (
               <ProductItem
                  pd={pd}
                  key={index}
                  ref={this.props.arrayRef[pd.id]}
                  addCart={this.props.addCart}
               />
            ))}

            {/* {console.log(this.props)} */}

         </div>
      )
   }
}
