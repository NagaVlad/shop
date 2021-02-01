import React from 'react';

class Search extends React.Component {
   state = {
      searchString: '',
      // abv: 0;
   }


   handleChange = (e) => {
      this.setState({
         searchString: e.target.value
      }, console.log(this.state.searchString))
   }

   render() {

      let products = this.props.data,
         searchString = this.state.searchString.trim().toLowerCase();

      if (searchString.length > 0) {
         products = products.filter((el) => {
            return el.name.toLowerCase().match(searchString);
         })
      } else {
         console.log('Нет товаров');
      }

      console.log('продукты', products);
      // console.log('нижинй регистр', searchString);
      return (
         <>
            {/* <h4>Сортировать по крепости</h4>
            <button>sord</button> */}
            <div >
               <input type='text' value={this.state.searchString} onChange={this.handleChange} />
               <ul>
                  {products.map((el, index) => {
                     return <li key={index}>{el.name}</li>
                  })}
               </ul>
            </div >
         </>
      )
   }

}


export default Search