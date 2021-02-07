import React from 'react'
import { connect } from 'react-redux';
import { closeModal, setTotal } from './redux/actions/actions';
import { addToCart, cnahgeIsEmpty } from './redux/actions/actions'
import { changeProductItemCheckedStatus } from './mainFunc'

class Cart extends React.Component {
  componentDidMount() {
    console.log('Корзина', this.props.cart)
  }


  // changeProductItemCheckedStatus = ({ id, isChecked, input }) => {
  //   // console.log((input.current.checked = isChecked))
  //   const productItem = this.props.data.find((el) => el.id === id);
  //   // const globalIndex = this.state.filtredByNameData.indexOf(productItem)
  //   productItem.isChecked = isChecked;
  //   if (isChecked) {
  //     this.props.cart.push(productItem);
  //   } else {
  //     const index = this.props.cart.indexOf(productItem);
  //     if (index > -1) {
  //       this.props.cart.splice(index, 1);//НАДО ЛИ ВЫНОСИТЬ ЭТО В REDUx
  //     }
  //   }
  //   this.props.addToCart(this.props.cart)

  //   this.setState(
  //     (prevState) => ({
  //       // filtredByNameData: [...prevState.filtredByNameData],
  //       // cart: [...prevState.cart],
  //     }),
  //     () => {
  //       input.current && (input.current.checked = isChecked);
  //     }
  //   );
  // };

  componentWillMount() {
    document.body.style.overflow = "hidden";
  }
  render() {
    console.log(this.props);
    return (
      <>
        <div className='modal_wrap activitis' onClick={() => { document.body.style.overflow = "visible"; return this.props.closeModal() }}>
          <div className='modal_window' onClick={(e) => e.stopPropagation()} >
            <i
              className='material-icons modal_close'
              onClick={() => { document.body.style.overflow = "visible"; return this.props.closeModal() }}>
              close
            </i>
            <h3 style={{ textAlign: 'center' }}>Корзина</h3>
            <hr />
            {/* {this.props.cart.length > 0 ? cnahgeIsEmpty() : this.props.isEmpty} */}
            {/* {console.log('СОСТОЯНИЕ КОРЗИНЫ', this.props.isEmpty)} */}
            {this.props.cart.length > 0 ? null : <h3 className="grey-text">Нет добавленных продуктов</h3>}
            {/* {this.props.isEmpty === false ? null : <h3 className="grey-text">Нет добавленных продуктов</h3>} */}

            {this.props.cart.map((elem, index) => (
              // this.countTotal(elem[0])
              <div key={elem.id}>
                <div className='collection'>
                  <div className='collection-item row'>
                    <div className='col s6'>
                      Название: <h5>{elem.name}</h5>
                    </div>
                    <div className='col s3'>
                      Цена: <h5 className='red-text'>{elem.id}</h5>
                    </div>
                    <div className='col s3'>
                      <button
                        onClick={(e) => {
                          changeProductItemCheckedStatus({
                            id: elem.id,
                            isChecked: false,
                            input: elem.ref,
                          }, this.props)
                        }}
                        className='btn red'>
                        Удалить
                      </button>
                    </div>
                    <h1>{index}</h1>
                  </div>
                </div>
              </div>
            ))}
            <h4>Итоговая сумма: {this.props.total}</h4>
            {console.log('cart', this.props)}
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.appReducer.cart,
    data: state.appReducer.data,
    total: state.appReducer.total,
    // isEmpty: state.appReducer.isEmpty
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // showCart: () => dispatch(showCart()),
    closeModal: () => {
      dispatch(closeModal())
    },
    addToCart: (data) => dispatch(addToCart(data)),
    setTotal: (data) => dispatch(setTotal(data)),
    // cnahgeIsEmpty: () => dispatch(cnahgeIsEmpty())
    // changeProductItemCheckedStatus: (data) => dispatch(changeProductItemCheckedStatus(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)