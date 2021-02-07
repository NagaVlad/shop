import React from 'react'
import { connect } from 'react-redux';
import { closeModal, setTotal } from './redux/actions/actions';
import { addToCart, cnahgeIsEmpty } from './redux/actions/actions'
import { changeProductItemCheckedStatus } from './mainFunc'

class Cart extends React.Component {
  componentDidMount() {
    console.log('Корзина', this.props.cart)
  }
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
            {this.props.cart.length > 0 ? null : <h3 className="grey-text">Нет добавленных продуктов</h3>}
            {this.props.cart.map((elem, index) => (
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal())
    },
    addToCart: (data) => dispatch(addToCart(data)),
    setTotal: (data) => dispatch(setTotal(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)