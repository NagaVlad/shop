import React from 'react';
import Cart from './Cart';
import Registration from './Registration'
import './App.css'

import axios from 'axios'
import ReactPaginate from 'react-paginate';


import Search from './Search'

import ProductFilter from './Filter/ProductFilter'

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalReg: false,
      // data2: [],
      cart: [],
      isEmpty: 'true',
      total: 0,


      itog: [],
      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0

    }
    this.deleteHandler = this.deleteHandler.bind(this)

    this.handlePageClick = this.handlePageClick.bind(this);
  }



  //!!
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
      currentPage: selectedPage,
      offset: offset
    }, () => {
      this.receivedData()
    });

  };

  // !!
  receivedData() {
    axios
      .get(`https://api.punkapi.com/v2/beers`)
      .then(res => {

        const data = res.data;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        const postData = slice.map((pd, index) =>
          <React.Fragment>
            {/* <p>{pd.name}</p>
          <div className="card-action">
            <label>
              <input type="checkbox" onChange={() => this.addCart(pd.name)} />
              <span>Add to cart</span>
            </label> */}


            {/* ...... */}
            {/* <div className="row"> */}
            <div className="col s3 offset-s1" key={index}>
              <div className="card">
                <div className="card-image">
                  <img src={pd.image_url} />
                  <span className="card-title red-text">{pd.name}</span>
                </div>
                <div className="card-content">
                  <p>99 $</p>
                </div>
                <div className="card-action">
                  <label>
                    <input type="checkbox" onChange={() => this.addCart(pd.name)} />
                    <span>Add to cart</span>
                  </label>
                </div>
              </div>
            </div>
            {/* </div> */}
            {/* .............. */}
            {/* </div> */}
            {/* {console.log(pd)} */}

            {/* <img src={pd.thumbnailUrl} alt="" /> */}
          </React.Fragment>)

        this.setState({
          pageCount: Math.ceil(data.length / this.state.perPage),
          itog: data,
          postData
        })
      });
  }


  componentDidMount() {

    // fetch('https://api.punkapi.com/v2/beers?ibu_lt=1')

    // fetch('https://api.punkapi.com/v2/beers?page=5&per_page=10')
    //   .then((res) => res.json())
    //   .then((data2) => {
    //     this.setState({ data2: [...data2] })

    //   });

    this.receivedData()
  }

  addCart(Id) {
    console.log(Id);
    const Product = this.state.itog.find((elem) => {
      // console.log('ЭТОТ ИЩУ', elem.name);
      return elem.name === Id
    });


    const { id, name, image_url } = Product;
    const newArr = [id, name, image_url]
    this.setState({
      cart: this.state.cart.concat([newArr]),
      isEmpty: 'false'
      // });
    }, this.counterHandler);



    // console.log(Product);
    // // console.log(Product);
    // const { id, name, image_url } = Product;
    // console.log(id, name, image_url);
    // const newObject = { id, name, image_url }
    // const newArr = [id, name, image_url]
    // // this.setState({ cart: this.state.cart.push(id) });

    // this.setState({
    //   cart: this.state.cart.concat([newArr]),
    //   isEmpty: 'false'
    //   // }, this.counterHandler);
    // });

    // // this.setState({ cart: [...this.state.cart, ...newArr] });

    // this.setState({
    //   cart: this.state.cart.push(newObject)
    // })
    // // console.log('STATE', this.state.cart);
  }

  counterHandler = () => {
    console.log('ТОТАЛ', this.state.total)
    this.setState({

      total: this.state.cart.reduce((acc, currentValue) => {
        console.log('ACC', acc)
        console.log('currentValue', currentValue)
        return Number(acc) + Number(currentValue[0])
      }, 0)
    })
    // }, () => { console.log(this.state.total) })

  }

  deleteHandler(index) {
    // console.log('delete', index);
    this.state.cart.splice(index, 1)
    this.setState(
      (prevState) => ({ cart: [...prevState.cart] }),
      // () => { console.log(this.state.total) }
      this.counterHandler
    )
    console.log('Новое', this.state.cart);
  }

  render() {
    return (
      <>
        {/* <div className="container">
          <h1>Каталог Товаров</h1>

          <hr />


          <button className="btn green" onClick={
            () => {
              this.setState({ modal: true })
            }
          }>Корзина</button>
          <button className="btn blue" onClick={() => this.setState({ modalReg: true })}>Регистрация</button>
          <hr />

          <div className="row">

            {this.state.data2.length ?
              this.state.data2.map((elem, index) => (
                <div className="col s3 offset-s1" key={index}>
                  <div className="card">
                    <div className="card-image">
                      <img src={elem.image_url} />
                      <span className="card-title red-text">{elem.name}</span>
                    </div>
                    <div className="card-content">
                      <p>99 $</p>
                    </div>
                    <div className="card-action">
                      <label>
                        <input type="checkbox" onChange={() => this.addCart(elem.id)} />
                        <span>Add to cart</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))

              :
              <h3 className="grey-text">No products</h3>
            }
          </div>

        </div>

        { this.state.modal ? <Cart
          close={() => this.setState({ modal: false })}
          cart={this.state.cart}
          isEmpty={this.state.isEmpty}
          total={this.state.total}
          deleteHandler={this.deleteHandler}
        // counterHandler={this.counterHandler}
        /> : null}

        { this.state.modalReg ? <Registration close={() => this.setState({ modalReg: false })} /> : null} */}
        {/* <div className="container"> */}

        <h1>Каталог товаров</h1>

        <div className="row">
          {this.state.postData}
        </div>
        {/* </div> */}

        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"} />

        { this.state.modal ? <Cart
          close={() => this.setState({ modal: false })}
          cart={this.state.cart}
          isEmpty={this.state.isEmpty}
          total={this.state.total}
          deleteHandler={this.deleteHandler}
        /> : null}

        { this.state.modalReg ? <Registration close={() => this.setState({ modalReg: false })} /> : null}

        <button className="btn green" onClick={
          () => { this.setState({ modal: true }) }}>
          Корзина
          </button>

        <button className="btn blue" onClick={() => this.setState({ modalReg: true })}>Регистрация</button>
        <hr />



        {/*!!! РАСКОММЕНТИРОВАТЬ <div className="container" >
          <h3>Поиск товара</h3>
          <Search
            data={this.state.itog}
          />
        </div> */}

        <ProductFilter
          data={this.state.itog}
        />



      </>

    )
  }
}