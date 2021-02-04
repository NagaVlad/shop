import React, { Component } from "react";

class ProductFilterMenu extends Component {
  render() {
    return (
      <div>
        <form action="#">
          <p>
            <label>
              <p></p>
              <input
                type="checkbox"
                onChange={() => {
                  this.props.handleChangeFilter();
                }}
              />
              <span>Крепость меньше 8%</span>
            </label>
          </p>
        </form>
      </div>
    );
  }
}

export default ProductFilterMenu;
