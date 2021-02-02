import React from 'react'
import Cart from './Cart'
import Registration from './Registration'
import './App.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Search from './Search'
import ProductFilter from './Filter/ProductFilter'
import ProductItem from './ProductItem'
export default class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         modal: false,
         modalReg: false,
         cart: [],
         isEmpty: 'true',
         total: 0,
         itog: [],
         offset: 0,
         data: [],
         perPage: 10,
         currentPage: 0,
         postData: [],
         slice: [],
         checkChecked: [],
         arrayRef: [],
      }
   }

   handlePageClick = (e) => {
      const selectedPage = e.selected
      const offset = selectedPage * this.state.perPage

      this.setState(
         {
            currentPage: selectedPage,
            offset: offset,
         },
         () => {
            this.receivedData()
         }
      )
   }

   receivedData() {
      axios.get(`https://api.punkapi.com/v2/beers`).then((res) => {
         const data = res.data
         const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
         )

         const arrayRef = Array.from({
            length: slice.length,
         }).map(() => React.createRef())

         this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            itog: data,
            arrayRef,
            slice,

         })
      })
   }

   componentDidMount() {
      this.receivedData()
   }
   //ДОБАВЛЯЮ В КОРЗИНУ!!!!!!!!!!!!!!
   addCart = (Name, e, index) => {
      if (e.target.checked) {
         // console.log(Name);
         const Product = this.state.itog.find((elem) => {
            return elem.name === Name
         })

         const { id, name, image_url } = Product
         const newArr = [id, name, image_url]

         this.setState(
            {
               cart: this.state.cart.concat([newArr]),
               isEmpty: 'false',
            },
            this.counterHandler
         )
      } else {
         console.log('Удаляю')
         this.deleteHandler2(index[0], e)
      }
   }

   counterHandler = () => {
      this.setState({
         total: this.state.cart.reduce((acc, currentValue) => {
            return Number(acc) + Number(currentValue[0])
         }, 0),
      })
   }

   deleteHandler2(index) {
      this.state.cart.splice(index, 1)
      this.setState(
         (prevState) => ({ cart: [...prevState.cart] }),
         this.counterHandler
      )
      console.log('Новое', this.state.cart);
   }



   deleteHandler = (index, id) => {
      const refIndex = this.state.slice.findIndex((el) => el.id === id)
      this.state.arrayRef[refIndex].current.checked = false

      this.state.cart.splice(index, 1)
      this.setState(
         (prevState) => ({
            cart: [...prevState.cart],
         }),
         this.counterHandler
      )
   }

   render() {
      return (
         <>
            <h1>Каталог товаров</h1>
            <div className='row'>
               {this.state.slice.map((pd, index) => (
                  <ProductItem
                     pd={pd}
                     key={index}
                     ref={this.state.arrayRef[index]}
                     addCart={this.addCart}
                  />
               ))}
            </div>


            <div className='row'>{/* {this.state.itog} */}</div>

            <ReactPaginate
               previousLabel={'prev'}
               nextLabel={'next'}
               breakLabel={'...'}
               breakClassName={'break-me'}

               pageCount={this.state.pageCount}
               marginPagesDisplayed={2}
               pageRangeDisplayed={5}
               onPageChange={this.handlePageClick}
               containerClassName={'pagination'}
               subContainerClassName={'pages pagination'}
               activeClassName={'active'}
            />

            {this.state.modal ? (
               <Cart
                  close={() => this.setState({ modal: false })}
                  cart={this.state.cart}
                  isEmpty={this.state.isEmpty}
                  total={this.state.total}
                  deleteHandler={this.deleteHandler}
               />
            ) : null}

            {this.state.modalReg ? (
               <Registration close={() => this.setState({ modalReg: false })} />
            ) : null}

            <button
               className='btn green'
               onClick={() => {
                  this.setState({ modal: true })
               }}>
               Корзина
        </button>

            <button
               className='btn blue'
               onClick={() => this.setState({ modalReg: true })}>
               Регистрация
        </button>

            <hr />

            <div className="container" >
               <h3>Поиск товара</h3>
               <Search
                  data={this.state.itog}
               />
            </div>

            <ProductFilter data={this.state.itog} />
         </>
      )
   }
}
