
import React, { Component } from "react"


class ProducItem extends Component {
   constructor(props) {
      super(props);
      this.state = {

      }
      // this.handleChange = this.handleChange.bind(this)

      this.myRef = React.createRef();
   }

   render() {
      return (
         <div className="col s3 offset-s1">
            <div className="card">
               <div className="card-image">
                  <img src={this.props.pd.image_url} />
                  <span className="card-title red-text">{this.props.pd.name}</span>
               </div>
               <div className="card-content">
                  <p>99 $</p>
               </div>
               <div className="card-action">
                  <label>
                     <input ref={this.props.innerRef} type="checkbox" onChange={(e) => this.props.addCart(this.props.pd.name, e, this.props.pd.id)} />
                     <span>Add to cart</span>
                  </label>
               </div>
            </div>
         </div>
      )
   }
}

export default ProducItem