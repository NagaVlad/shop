import React from 'react'

export default class Home extends React.Component {
   render() {
      return (
         <div className="container">
            <h1 style={{ textAlign: "center" }}>Контакты</h1>
            <div class="col s12 m7">
               <div class="card horizontal">
                  <div class="card-image">
                     <img src="https://metrorus.ru/metromaps/spb/css/img/spbmap.jpg" />
                  </div>
                  <div class="card-stacked">
                     <div class="card-content">
                        <p>Офис магазина находиться по адресу г. Санкт-Петербург, ул. Ленина 593</p>
                     </div>
                     <div class="card-action">
                        <a href="#">Социальные сети</a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
