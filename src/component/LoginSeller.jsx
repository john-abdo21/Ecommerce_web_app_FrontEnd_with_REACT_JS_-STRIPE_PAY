import React, { Component,Fragment } from 'react'
import Face6Icon from '@mui/icons-material/Face6';  
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';      

export class LoginSeller extends Component {
  render() {
    return (
        <Fragment>
            <div className='container-fluid login d-flex justify-content-center align-items-center flex-column'>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                    <div className='col col-md-12 mb-5 alertshadw'><p>Please Enter Valid Email and Password ...</p></div>
                </div>
                <form method="POST"  encType='multipart/form-data'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                        <div className='col col-md-7 mb-2'><input className="form-control form-control-sm" type="text" placeholder="Email@" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-7 mb-3'><input className="form-control form-control-sm" type="text" placeholder="Password" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-10 d-flex justify-content-center smaline'>Looking For Buying ? Login Here ... &nbsp;<Link className='loginLink' to='/loginUser'>click me</Link></div>
                        <div className='col col-md-10 d-flex justify-content-center mb-3 smaline'>Employees Login Here ... &nbsp;<Link className='loginLink' to='/loginEmployee'>click me</Link></div>
                        <div className='col col-md-10 d-flex justify-content-center mb-3'><button type="button" class="btn btn-sm btn-outline-info"><Face6Icon /> Login</button></div>
                        <div className='col col-md-10 d-flex justify-content-center mb-2 smaline'>Forgot Password ? ... &nbsp; <Link className='loginLink' to='/forgotPass'>click me</Link></div>

                    </div>
                </form>
            </div>        
        </Fragment>
    )
  }
}

export default LoginSeller
