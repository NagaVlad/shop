
import React, { Component } from "react"
import ProductFilterMenu from './ProductFilterMenu'
import ProductFilterResults from './ProductFilterResults'

class ProductFilter extends Component {
   constructor(props) {
      super(props);
      this.handleFormInput = this.handleFormInput.bind(this);

      this.state = {
         series: 0,
         abv: 12,
         checked: false
      }
      this.handleChangeFilter = this.handleChangeFilter.bind(this)
   }

   handleFormInput(abv, series) {
      this.setState({
         series: series,
         abv: abv
      })
   }

   handleChangeFilter() {
      this.setState(
         (prevState) => ({ checked: !prevState.checked }),
         () => { console.log(this.state.checked); }
      )
   }

   render() {
      return (
         <>
            <ProductFilterMenu
               series={this.state.series}
               abv={this.state.abv}
               handleChangeFilter={this.handleChangeFilter}
            />

            <ProductFilterResults
               data={this.props.data}
               abv={this.state.abv}
               checked={this.state.checked}
            />
            {/* {console.log(this.props.data)} */}
         </>
      )
   }
}

export default ProductFilter