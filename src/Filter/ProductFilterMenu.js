
import React, { Component } from "react"
// import ProductFilterResults from './ProductFilterResults'
class ProductFilterMenu extends Component {


   // state = {
   //    checked: 'false'
   // }

   // handleChange() {
   //    this.setState({
   //       checked: 'true'
   //    })
   // }

   render() {
      return (
         <div>
            <h3>
               Сортировать товары
            </h3>
            <form action="#">
               <p>
                  <label>
                     <p></p>
                     <input type="checkbox" onChange={() => { this.props.handleChange() }} />
                     <span>Крепость меньше 8</span>
                  </label>
               </p>
               {/* <p>Соятояние сортировки {this.state.checked}</p> */}
            </form>
            {/* <form className="filter-menu">
               <label for="abvInput">Sort By ABV</label>
               <input id="abvInput" type="checkbox" checked={this.props.abv} ref="abvInput" onChange={this.handleChange} />
               <label for="seriesInput">Filter By Series</label>
               <select id="seriesInput" ref="seriesInput" onChange={this.handleChange}>
                  <option value="All">All</option>
                  <option value="Year-Round Ales">Year-Round Ales</option>
                  <option value="Dictator Series">Dictator Series</option>
                  <option value="Holy Trinity">Holy Trinity</option>
               </select>
            </form> */}
         </div>
      )
   }
}

export default ProductFilterMenu