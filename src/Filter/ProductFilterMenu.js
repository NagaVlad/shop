import React, { Component } from "react";
import { connect } from "react-redux";
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
function mapStateToProps(state) {
  return {
    abv: state.appReducer.abv,
  };
}

export default connect(mapStateToProps)(ProductFilterMenu);