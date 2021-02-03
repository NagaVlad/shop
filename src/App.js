import React from 'react'
import Cart from './Cart'
import Registration from './Registration'
import './App.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Search from './Search'
import ProductFilter from './Filter/ProductFilter'
// import ProductItem from './ProductItem'

import Modal from './Modal'


import ProductLayout from './ProductLayout'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      modal: false,
      modalReg: false,
      cart: [],
      isEmpty: 'true',
      total: 0,
      itog: [],//То что в дате
      offset: 0,
      // data: [],
      perPage: 9,
      currentPage: 0,
      postData: [],
      slice: [],//Пагинация
      checkChecked: [],
      arrayRef: [],
      searchProducts: [],//Найденный продукт

      searchString: '',
      startArraySearch: [],//Все товары


      modal2: true
    }
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected
    const offset = selectedPage * this.state.perPage
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      }, () => { this.receivedData() }
    )
  }

  receivedData() {
    axios.get(`https://api.punkapi.com/v2/beers`).then((res) => {

      var data = []
      if (this.state.searchString.length > 0) {
        data = this.state.searchProducts
        // data = res.data
        console.log('data', data);
      } else {
        data = res.data
        console.log('data', data);
      }

      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      )

      const arrayRef = Array.from({
        length: this.state.startArraySearch.length,
      }).map(() => React.createRef())

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        itog: data,
        arrayRef,
        slice,
        startArraySearch: res.data
      })
    })
  }

  componentDidMount() {
    this.receivedData()
    this.searching()//!!
  }

  addCart = (Name, e, index) => {
    if (e.target.checked) {
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
      //////
      const testArray = []
      this.state.cart.map((el, index) => {
        return testArray.push(el[0])
      })
      ///////

      const refIndex = testArray.indexOf(index)
      // this.deleteHandler2(index[refIndex])
      console.log('this.state.cart', this.state.cart);
      console.log('index', testArray);
      console.log('что нашел', this.state.arrayRef);

      this.deleteHandler2(refIndex)
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
    const refIndex = this.state.startArraySearch.findIndex((el) => el.id === id)

    console.log('id  c корзины', id);
    console.log('refIndex', refIndex + 1);
    console.log('arrayRef', this.state.arrayRef);


    // const refIndex = this.state.slice.findIndex((el) => el.id === index)
    // console.log('xxxxxxxx', this.state.arrayRef);
    // console.log('xxxxxxxx refINDEX', this.state.arrayRef[refIndex].current);

    this.state.arrayRef[refIndex + 1].current.checked = false

    this.state.cart.splice(index, 1)
    this.setState(
      (prevState) => ({
        cart: [...prevState.cart],
      }),
      this.counterHandler
    )
  }

  handleChange = (e) => {
    console.log('e', e.target.value);
    this.setState({
      searchString: e.target.value
    }, () => this.searching())
  }

  searching() {
    let products = this.state.startArraySearch,
      searchString = this.state.searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      products = products.filter((el) => {
        return el.name.toLowerCase().match(searchString);
      })
    } else {
      // console.log('Нет товаров');
    }
    console.log('products', products);
    this.setState({
      searchProducts: products,
      searchString
    }, this.receivedData())
  }

  render() {
    return (
      <>
        <h1 style={{ textAlign: 'center' }}>Каталог товаров</h1>
        {/* <input type='text' value={this.state.searchString} onChange={(e) => this.handleChange(e)} /> */}

        {/*Вынести ------- */}
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
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
          </div>
        </div>
        {/*Вынести ------- */}

        {/* Поиск */}
        <Search
          handleChange={this.handleChange}
          searchString={this.state.searchString}
        // data={this.state.itog}
        />

        {/* Layout */}
        <ProductLayout
          // slice={this.state.itog}//Сделал так
          slice={this.state.searchProducts}//Сделал так
          // slice={this.state.slice}
          arrayRef={this.state.arrayRef}
          addCart={this.addCart}
        />

        {/* Пагинация */}
        <div className="container">
          <div className="row">
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
          </div>
        </div>

        {/* Корзина */}
        {this.state.modal ? (
          <Cart
            close={() => this.setState({ modal: false })}
            cart={this.state.cart}
            isEmpty={this.state.isEmpty}
            total={this.state.total}
            deleteHandler={this.deleteHandler}
          // ref={this.state.arrayRef}//
          />
        ) : null}

        {/* Форма регистрации */}
        {this.state.modalReg ? (
          <Registration close={() => this.setState({ modalReg: false })} />
        ) : null}

        {/* Фильтр */}
        {/* <ProductFilter data={this.state.itog} /> */}


        {/* <Modal
          modal2={this.state.modal2}
          setActive={this.setModalActive}
        /> */}
      </>
    )
  }
}
