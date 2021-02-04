import React from "react";
import "./App.css";
import ProductItem from "./ProductItem";

export default class ProductLayout extends React.Component {
  render() {
    return (
      <div className="row">
        <h3 style={{ textAlign: "center", color: "black" }}>Товары</h3>
        {/* {this.props.slice.map((pd, index) => (
               <ProductItem
                  pd={pd}
                  key={index}
                  ref={this.props.arrayRef[pd.id]}
                  addCart={this.props.addCart}
               />
            ))} */}

        {this.props.filtredByNameData.map((pd, index) => (
          <ProductItem
            pd={pd}
            key={index}
            ref={this.props.arrayRef[index]}
            addToCart={this.props.addToCart}
            buttonDeleteClickHandler={this.props.buttonDeleteClickHandler}
          />
        ))}
      </div>
    );
  }
}
