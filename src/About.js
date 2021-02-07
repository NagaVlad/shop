import React from 'react'

export default class About extends React.Component {


   render() {
      return (
         <div className="container">
            <h1 style={{ textAlign: "center" }}>Информация о магазине</h1>
            <div class="col s12 m7">
               <h3 class="header">Наш магазин</h3>
               <div class="card horizontal">
                  <div class="card-image">
                     <img src="https://laiman.by/image/catalog/dlya_stranitsyi_mebel_dlya_magazina_alkogolnoy_produktsii/mebel_dlya_magazina_alkogolnoy_produktsii-6.jpg" />
                  </div>
                  <div class="card-stacked">
                     <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.</p>
                     </div>
                     <div class="card-action">
                        <a href="#">This is a link</a>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
