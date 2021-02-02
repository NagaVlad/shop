import React from 'react'

const ProducItem = (props) => {
   const { pd, innerRef, addCart } = props
   return (
      <div className='col s3 offset-s1'>
         <div className='card'>
            <div className='card-image'>
               <img src={pd.image_url} />
               <span className='card-title black-text'>{pd.name}</span>
            </div>
            <div className='card-content'>
               <p>Цена {pd.id}</p>
            </div>
            <div className='card-action'>
               <label>
                  <input
                     ref={innerRef}
                     type='checkbox'
                     onChange={(e) => addCart(pd.name, e, pd.id)}
                  />
                  <span>Добавить в корзину</span>
               </label>
            </div>
         </div>
      </div>
   )
}

export default React.forwardRef((props, ref) => (
   <ProducItem innerRef={ref} {...props} />
))
