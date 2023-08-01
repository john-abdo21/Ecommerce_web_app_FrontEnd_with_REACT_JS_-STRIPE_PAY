import React, { Component, Fragment } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';  

export class RegUser extends Component {
    render() {
        return (
            <Fragment>
                <div className='container-fluid login d-flex justify-content-center align-items-center flex-column'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                        <div className='col col-md-12 mb-5 alertshadw'><p>Please Enter Valid Email and Information ...<br/>Image Can only Be Jpg or Jpeg Formated.<br/>Password Must Be 8-50 Character Having<br/> Only a-z / A-Z / Numbers / !@-_</p></div>
                    </div>
                    <form method="POST"  encType='multipart/form-data'>
                        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="text" placeholder="Full Name" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="text" placeholder="Email@" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="date" placeholder="Date of Birth" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="number" min="1" max="100" placeholder="Age" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><select class="form-select" aria-label="Default select example">
                            <option selected disabled>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                            </select></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="text" placeholder="Country" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="text" placeholder="Address" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="text" placeholder="Delivery Address" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="number" placeholder="Phone Number" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input class="form-control form-control-sm" id="formFileSm" type="file" /></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="text" placeholder="Password" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input className="form-control form-control-sm" type="text" placeholder="Confirm Password" aria-label=".form-control-sm example" /></div>
                            <div className='col d-flex justify-content-center smaline mb-3'>Want to sell ? Register Here ... &nbsp;<Link className='loginLink' to='/regSeller'>click me</Link></div>
                            
                            <div className='col col-md-10 d-flex justify-content-center mb-3'><button type="button" class="btn btn-sm btn-outline-info"><AppRegistrationIcon /> Register</button></div>
                            </div>
                    </form>
                </div>

            </Fragment>
        )
    }
}

export default RegUser
