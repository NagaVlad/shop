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
import { add } from './redux/actions/actions'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filtredByNameData: [],
      cart: [],
      arrayRef: [],
      modal: false,
      modalReg: false,
      checkedFilter: false,
      isEmpty: "true",
      searchString: "",
      abv: 12,
      total: 0,
      offset: 0,
      perPage: 9,
      currentPage: 0,
      // slice: [],
      // modal2: true,
    };
    this.handleFormInputFilter = this.handleFormInputFilter.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  componentDidMount() {
    this.receivedData();
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  receivedData = async () => {
    let { data } = await axios.get(`https://api.punkapi.com/v2/beers`);
    data = data.map((el) => ({
      ...el,
      isChecked: false,
      ref: React.createRef(),
    }));
    this.setState({
      data,
      filtredByNameData: [...data],
    });
  };

  changeProductItemCheckedStatus = ({ id, isChecked, input }) => {
    // console.log((input.current.checked = isChecked))
    const productItem = this.state.data.find((el) => el.id === id);
    // const globalIndex = this.state.filtredByNameData.indexOf(productItem)
    productItem.isChecked = isChecked;
    if (isChecked) {
      this.state.cart.push(productItem);
    } else {
      const index = this.state.cart.indexOf(productItem);
      if (index > -1) {
        this.state.cart.splice(index, 1);
      }
    }
    this.setState(
      (prevState) => ({
        filtredByNameData: [...prevState.filtredByNameData],
        cart: [...prevState.cart],
      }),
      () => {
        input.current && (input.current.checked = isChecked);
      }
    );
  };

  counterHandler = () => {
    this.setState({
      total: this.state.cart.reduce((acc, currentValue) => {
        return Number(acc) + Number(currentValue[0]);
      }, 0),
    });
  };

  //*ПОИСК
  handleChange = (e) => {
    this.setState(
      {
        searchString: e.target.value,
      },
      () => this.searching()
    );
  };

  searching = () => {
    let searchString = this.state.searchString.trim().toLowerCase();

    if (searchString.length > 0) {
      let filtredByNameData = this.state.data.filter((el) => {
        return el.name.toLowerCase().match(searchString);
      });

      this.setState(
        {
          filtredByNameData,
        },
        () => {
          console.log(this.state.data);
        }
      );
    } else {
      this.setState(
        {
          filtredByNameData: [...this.state.data],
        },
        () => {
          console.log(this.state.data);
        }
      );
    }
  };

  //*ФИЛЬТР
  handleFormInputFilter(abv) {
    this.setState({
      abv: abv,
    });
  }

  handleChangeFilter() {
    this.setState(
      (prevState) => ({ checkedFilter: !this.state.checkedFilter }),
      // () => console.log("Соятояние фильтра", this.state.checkedFilter)
      () => {
        if (this.state.checkedFilter) {
          this.handleFiltred();
        } else {
          this.setState((prevState) => ({
            filtredByNameData: prevState.data,
          }));
        }
      }
    );
  }

  handleFiltred() {
    var results = [];
    this.state.data.map((product) => {
      if (this.state.abv < product.abv) {
        results.push(product);
        this.setState({
          filtredByNameData: results,
        });
      } else {
      }
    });
  }

  render() {
    console.log("APP", this.props);
    return (
      <>
        <div className="container ">
          <nav className="navig ">
            <ul className="navigation">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <li>
                  <NavLink to="/">Каталог товаров</NavLink>
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
                      this.setState({ modal: true });
                    }}
                  >
                    Корзина
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn blue"
                    onClick={() => this.setState({ modalReg: true })}
                  >
                    Регистрация
                  </button>
                </li>
              </div>
            </ul>
          </nav>
        </div>

        <h1 style={{ textAlign: "center" }}>Каталог товаров</h1>
        <Search
          handleChange={this.handleChange}
          searchString={this.state.searchString}
        />

        {/* Router */}
        <Route
          path="/"
          exact
          render={() => (
            <HomeLayout
              filtredByNameData={this.state.filtredByNameData} //!!ТУТ ЕСТЬ ОШИБКА!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              pageCount={this.state.pageCount}
              changeProductItemCheckedStatus={
                this.changeProductItemCheckedStatus
              }

            // pageCount={this.state.pageCount}
            />
          )}
        />
        <Route path="/about" exact component={About} />
        <Route path="/main" exact component={Main} />
        {/* Корзина */}
        {this.state.modal ? (
          <Cart
            close={() => this.setState({ modal: false })}
            cart={this.state.cart}
            changeProductItemCheckedStatus={this.changeProductItemCheckedStatus}
          />
        ) : null}

        {/* Форма регистрации */}
        {this.state.modalReg ? (
          <Registration close={() => this.setState({ modalReg: false })} />
        ) : null}

        {/* Фильтр */}
        <ProductFilter
          series={this.state.series}
          abv={this.state.abv}
          data={this.state.data}
          checked={this.state.checked}
          handleChangeFilter={this.handleChangeFilter}
        />
        {/* 
        {this.state.checked2 ? this.handleFiltred() : null} */}

        {/* <Modal
          modal2={this.state.modal2}
          setActive={this.setModalActive}
        /> */}

        <button onClick={this.props.onAdd}>Redux</button>
        <h4>ФЛАГ {this.props.counter}</h4>


        <Counter />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter1.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch(add()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
