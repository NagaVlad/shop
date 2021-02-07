import React, { Component } from "react";
import ProductFilterMenu from "./ProductFilterMenu";

class ProductFilter extends Component {
  render() {
    return (
      <>
        <ProductFilterMenu
          handleChangeFilter={this.props.handleChangeFilter}
        />
      </>
    );
  }
}

export default ProductFilter;
