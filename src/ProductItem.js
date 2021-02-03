import React, { useEffect, useState } from "react";

const ProducItem = (props) => {
  const [checked, setCheked] = useState(false);

  const { pd, innerRef, addToCart, buttonDeleteClickHandler } = props;

  useEffect(() => {
    if (checked) {
      addToCart(pd.id);
    } else {
      buttonDeleteClickHandler(pd.id);
    }
  }, [checked]);

  ////////////////
  // const deleteProductFrom = () => {
  //    const index = this.state.cart.findIndex((el) => el[0] === pd.id)

  //    const globalIndex = this.state.filtredByNameData.findIndex((el) => el.id === pd.id)

  //    this.state.cart.splice(index, 1)
  //    this.setState(
  //       (prevState) => ({
  //          cart: [...prevState.cart],
  //       }),
  //       this.counterHandler
  //    )
  // }

  ////////////

  return (
    <div className="col s3 offset-s1">
      <div className="card">
        <div className="card-image">
          <img src={pd.image_url} />
          <span className="card-title black-text">{pd.name}</span>
        </div>
        <div className="card-content">
          <p>Цена {pd.id}</p>
        </div>
        <div className="card-action">
          <label>
            <input
              ref={innerRef}
              type="checkbox"
              // onChange={(e) => addToCart(pd.id)}
              onChange={(e) => setCheked(innerRef.current.checked)}
              // onChange={(e) => addCart(pd.name, e, pd.id)}
            />
            <span>Добавить в корзину</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef((props, ref) => (
  <ProducItem innerRef={ref} {...props} />
));
