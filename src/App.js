import React from "react";
import Cart from "./Cart";
import Registration from "./Registration";
import "./App.css";
import axios from "axios";
import Search from "./Search";
import ProductFilter from "./Filter/ProductFilter";
import About from "./About";
import Main from "./Main";
import HomeLayout from "./HomeLayout";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from "./Modal";

export default class App extends React.Component {
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

  async receivedData() {
    const { data } = await axios.get(`https://api.punkapi.com/v2/beers`);
    console.log(data);
    this.setState(
      {
        data,
        filtredByNameData: data,
      },
      () => this.handlerRef()
    );
  }

  handlerRef() {
    const arrayRef = Array.from({
      length: this.state.filtredByNameData.length,
    }).map(() => React.createRef());

    this.setState({
      arrayRef,
    });
  }

  // const slice = data.slice(
  //   this.state.offset,
  //   this.state.offset + this.state.perPage
  // )

  componentDidMount() {
    this.receivedData();
    this.searching();
  }

  addToCart = (itemId, e) => {
    if (e.target.checked) {
      const Product = this.state.data.find((elem) => {
        return elem.id === itemId;
      });

      const { id, name, image_url } = Product;
      const newArr = [id, name, image_url];

      this.setState(
        {
          cart: this.state.cart.concat([newArr]),
          isEmpty: "false",
        },
        this.counterHandler
      );
    } else {
      this.buttonDeleteClickHandler(itemId);
    }
  };

  counterHandler = () => {
    this.setState({
      total: this.state.cart.reduce((acc, currentValue) => {
        return Number(acc) + Number(currentValue[0]);
      }, 0),
    });
  };

  buttonDeleteClickHandler = (id) => {
    const index = this.state.cart.findIndex((el) => el[0] === id);

    const globalIndex = this.state.filtredByNameData.findIndex(
      (el) => el.id === id
    );
    this.state.cart.splice(index, 1);
    this.setState(
      (prevState) => ({
        cart: [...prevState.cart],
      }),
      this.counterHandler
    );
  };

  buttonDeleteClickHandler2 = (id) => {
    const index = this.state.cart.findIndex((el) => el[0] === id);
    const globalIndex = this.state.filtredByNameData.findIndex(
      (el) => el.id === id
    );
    console.log("arrayRef", this.state.arrayRef);
    console.log("globalIndex", globalIndex);
    console.log("index", index);
    console.log(
      "ПРОВЕРКА ЧЕКБОКСА",
      this.state.arrayRef[globalIndex].current.checked
    );
    console.log("BYAFFFFFFF", this.state.cart);

    this.state.cart.splice(index, 1);
    this.setState(
      (prevState) => ({
        cart: [...prevState.cart],
      }),
      this.counterHandler
    );
    this.state.arrayRef[globalIndex].current.checked = false;
  };

  //*ПОИСК
  handleChange = (e) => {
    console.log("e", e.target.value);
    this.setState(
      {
        searchString: e.target.value,
      },
      () => this.searching()
    );
  };

  searching() {
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
          console.log("ОТФИЛЬТРОВАННЫЙ", this.state.filtredByNameData);
        }
        // searchProducts: products,
        // searchString
      );
    } else {
      this.setState({
        filtredByNameData: this.state.data,
      });
    }
  }

  //*ФИЛЬТР
  handleFormInputFilter(abv) {
    this.setState({
      abv: abv,
    });
  }

  handleChangeFilter() {
    this.setState(
      (prevState) => ({ checkedFilter: !this.state.checkedFilter }),
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
    return (
      <>
        {/* Меню */}
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

        <div className="container">
          {/* Фильтр */}
          <ProductFilter
            abv={this.state.abv}
            handleChangeFilter={this.handleChangeFilter}
            data={this.state.data}
            abv={this.state.abv}
            checked={this.state.checked}
          />
        </div>
        {/* Поиск */}
        <Search
          handleChange={this.handleChange}
          searchString={this.state.searchString}
          // data={this.state.itog}
        />

        {/* Router */}
        <Route
          path="/"
          exact
          render={() => (
            <HomeLayout
              filtredByNameData={this.state.filtredByNameData}
              arrayRef={this.state.arrayRef}
              addToCart={this.addToCart}
              pageCount={this.state.pageCount}
              buttonDeleteClickHandler={this.buttonDeleteClickHandler}
              // pageCount={this.state.pageCount}
              // slice={this.state.slice}
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
            isEmpty={this.state.isEmpty}
            total={this.state.total}
            buttonDeleteClickHandler={this.buttonDeleteClickHandler2}
            // ref={this.state.arrayRef}//
          />
        ) : null}

        {/* Форма регистрации */}
        {this.state.modalReg ? (
          <Registration close={() => this.setState({ modalReg: false })} />
        ) : null}

        {/* <Modal
          modal2={this.state.modal2}
          setActive={this.setModalActive}
        /> */}
      </>
    );
  }
}
