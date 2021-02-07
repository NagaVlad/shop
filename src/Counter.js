import React from "react";
import { connect } from 'react-redux'
import { add2 } from './redux/actions/actions'
class Counter extends React.Component {
   render() {
      return (
         <div>
            <h3>Counter№2</h3>
            <h5>Значение{this.props.counter2}</h5>
            <button onClick={() => this.props.onAdd2()}>Add</button>
         </div>

      )
   }
}

function mapStateToProps(state) {
   return {
      counter2: state.counter2.counter2
   }
}

function mapDispatchToProps(dispatch) {
   return {
      onAdd2: () => dispatch(add2()),
   };
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)