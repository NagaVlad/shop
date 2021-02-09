import React from "react";
import Cart from "./Cart";
import Registration from "./Registration";
import "./App.css";
import axios from "axios";
import Search from "./Search";
import ProductFilter from "./Filter/ProductFilter";
import About from "./About";
import Main from "./Main";
import { Route, NavLink } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import { connect } from "react-redux";
import Counter from './Counter'
import {
  add, showCart, showReg, setDataFilter, addToCart,
  changeFiltredByNameData, changeFilterFlag,
  changeCurrentPaga, changeOfsset
} from './redux/actions/actions'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      offset: 0,
      perPage: 9,
      currentPage: 0,

      pageCount: 1
    };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.receivedData();
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.props.perPage;


    this.props.changeCurrentPaga(selectedPage)
    this.props.changeOfsset(offset)


    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        // this.receivedData();
      }
    );

    // this.receivedData();
  };

  receivedData = async () => {
    let { data } = await axios.get(`https://api.punkapi.com/v2/beers`);
    data = data.map((el) => ({
      ...el,
      isChecked: false,
      ref: React.createRef(),
    }));

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
    })

    console.log('data.length', data.length);
    console.log('this.state.perPage', this.state.perPage);

    this.props.setDataFilter(data)
  };

  handleChange = (e) => {
    this.setState({ searchString: e.target.value },
      () => this.searching()
    );
  };

  searching = () => {
    let searchString = this.state.searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      let filtredByNameData = this.props.data.filter((el) => {
        return el.name.toLowerCase().match(searchString);
      });
      this.props.changeFiltredByNameData(filtredByNameData)
    } else {
      this.props.changeFiltredByNameData(this.props.data)
    }
  };

  handleChangeFilter() {
    this.props.changeFilterFlag(this.props.checkedFilter)
    if (this.props.checkedFilter) {
      this.handleFiltred();
    } else {
      this.props.changeFiltredByNameData(this.props.data)
    }
  }

  handleFiltred() {
    var results = [];
    this.props.data.map((product) => {
      if (this.props.abv < product.abv) {
        results.push(product);
        this.props.changeFiltredByNameData(results)
      } else { }
    });
  }

  render() {
    console.log("APP", this.props);
    return (
      <>
        <div className="container menuu ">
          <nav className="navig ">
            <ul className="navigation">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <li>
                  <NavLink to="/shop">Каталог товаров</NavLink>
                </li>
                <li>
                  <NavLink to="/about">О магазине</NavLink>
                </li>
                <li>
                  <NavLink to="/main">Контакты</NavLink>
                </li>
                <li>
                  <button
                    className="btn btn green"
                    onClick={() => {
                      this.props.showCart()
                    }}
                  >
                    Корзина
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn blue"
                    onClick={() => { this.props.showReg() }}
                  >
                    Регистрация
                  </button>
                </li>
              </div>
            </ul>
          </nav>
        </div>

        <h1 style={{ textAlign: "center" }}><i class="medium material-icons">shopping_cart</i>Каталог товаров<i class="medium material-icons">shopping_cart</i></h1>
        <Search
          handleChange={this.handleChange}
          searchString={this.state.searchString}
        />

        <div className="container">
          {/* Фильтр */}
          <ProductFilter
            // series={this.state.series}//!!
            // abv={this.state.abv}
            // data={this.props.data}//!!
            checked={this.state.checked}
            handleChangeFilter={this.handleChangeFilter}
          />
        </div>

        {/* Router */}
        <Route
          path="/shop/"
          exact
          render={() => (
            <HomeLayout
              // filtredByNameData={this.props.filtredByNameData}
              pageCount={this.state.pageCount}
              // changeProductItemCheckedStatus={
              //   this.changeProductItemCheckedStatus
              // }

              // pageCount={this.state.pageCount}
              handlePageClick={this.handlePageClick}

              currentPage={this.state.currentPage}////////////////////
              offset={this.state.offset}/////////////////////////////////
            />
          )}
        />
        <Route path="/about" exact component={About} />
        <Route path="/main" exact component={Main} />
        {/* Корзина */}
        {this.props.modal ? (
          <Cart />
        ) : null}

        {/* Форма регистрации */}
        {this.props.modalReg ? (
          <Registration close={() => this.setState({ modalReg: false })} />
        ) : null}

        {/*УДАЛИТЬ  */}
        {/* <button onClick={this.props.onAdd}>Redux</button>
        <h4>ФЛАГ {this.props.counter}</h4>
        <Counter /> */}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter1.counter,
    modal: state.appReducer.modal,
    modalReg: state.appReducer.modalReg,
    data: state.appReducer.data,
    filtredByNameData: state.appReducer.filtredByNameData,
    cart: state.appReducer.cart,
    checkedFilter: state.appReducer.checkedFilter,
    abv: state.appReducer.abv,
    total: state.appReducer.total,
    offset: state.appReducer.offset,
    perPage: state.appReducer.perPage,
    currentPage: state.appReducer.currentPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch(add()),
    showCart: () => dispatch(showCart()),
    showReg: () => dispatch(showReg()),
    setDataFilter: (data) => dispatch(setDataFilter(data)),
    addToCart: (data) => dispatch(addToCart(data)),
    changeFiltredByNameData: (data) => dispatch(changeFiltredByNameData(data)),
    changeFilterFlag: (data) => dispatch(changeFilterFlag(data)),
    changeCurrentPaga: (data) => dispatch(changeCurrentPaga(data)),
    changeOfsset: (data) => dispatch(changeOfsset(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
