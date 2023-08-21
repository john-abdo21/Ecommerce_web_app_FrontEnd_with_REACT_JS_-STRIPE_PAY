import React, { Component, Fragment } from 'react'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';   

import cashdel from '../assets/images/cashdel.jpg'
import stripe from '../assets/images/stripe.jpg'

export class Footer extends Component {
  render() {
    return (
        <Fragment>
            <div className='container-fluid footdes ps-5 pe-5'>
                <div className='row row-cols-1 row-cols-md-4'>
                    
                <div className='col'>
                <div class="card footcarddes">
                <div class="card-body">
                  <h5 class="card-title headfont">Contact Us</h5>
                
                  <p class="card-text cardfootfont bdfontres">saminyeasararnob@gmail.com<br></br>arnobsamin95@gmail.com<br></br>Phone No. : 01856161055</p>

                </div>
                </div>

                </div>
                


                <div className='col'>
                <div class="card footcarddes">
                <div class="card-body">
                  <h5 class="card-title headfont">About Us</h5>
                  
                  <p class="card-text cardfootfont bdfontres">24/7 Hours Active Team Members<br></br>100% Customer Satisfaction<br></br>Authentic Varified Sellers Gaurenteed</p>
              
                </div>
                </div>

                </div>



                <div className='col'>
                <div class="card footcarddes">
                <div class="card-body">
                  <h5 class="card-title headfont">Terms & Policy</h5>
                  
                  <p class="card-text cardfootfont bdfontres"><Link to='/viewTerms'>Visit Page ...</Link></p>
          
                </div>
                </div>

                </div>





                <div className='col'>
                <div class="card footcarddes">
                <div class="card-body">
                  <h5 class="card-title headfont">Payment Methods</h5>
                 <div className='row row-cols-1 row-cols-md-2'>
                    <div className='col'><img src={cashdel} className='cashdel'></img></div>
                    <div className='col'><img src={stripe} className='cashdel'></img></div>
                 </div>
                
              
                </div>
                </div>

                </div>




                </div>


            </div>
        </Fragment>
    )
  }
}

export default Footer
