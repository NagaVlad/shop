import React from 'react'
import ProductLayout from './ProductLayout'
import ReactPaginate from 'react-paginate'

export default class HomeLayout extends React.Component {


   render() {
      return (
         <div>
            <ProductLayout
               slice={this.props.slice}//Сделал так
               arrayRef={this.props.arrayRef}
               addCart={this.props.addCart} />
            {console.log('ПРОПСЫ', this.props)}
            <div className="container">
               <div className="row">

                  <ReactPaginate
                     previousLabel={'prev'}
                     nextLabel={'next'}
                     breakLabel={'...'}
                     breakClassName={'break-me'}
                     pageCount={this.props.pageCount}
                     marginPagesDisplayed={2}
                     pageRangeDisplayed={5}

                     containerClassName={'pagination'}
                     subContainerClassName={'pages pagination'}
                     activeClassName={'active'}
                  />
               </div>
            </div>
         </div>
      )
   }
}


