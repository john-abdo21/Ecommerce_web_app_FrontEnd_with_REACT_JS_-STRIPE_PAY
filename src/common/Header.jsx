import React, { Component,Fragment, Suspense } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    

import Nav from './Nav';

const LoginUser = React.lazy(()=>import('../component/LoginUser'));
const LoginSeller = React.lazy(()=>import('../component/LoginSeller'));
const LoginEmployee = React.lazy(()=>import('../component/LoginEmployee'));



export class Header extends Component {
    constructor(){
        super();
    }
    
    BootstrapSpinnerLoader = ()=> {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
            <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
            </div>
        </div>
        );
    }

    render() {


        return (
            <Router>
                <Fragment>
                    <Nav />

                    <Suspense fallback={this.BootstrapSpinnerLoader()}>
                        <switch>
                            <Route exact path='/loginUser' component={()=>(<LoginUser />)} />
                            <Route exact path='/loginSeller' component={()=>(<LoginSeller />)} />
                            <Route exact path='/loginEmployee' component={()=>(<LoginEmployee />)} />
                        </switch>
                    </Suspense>

                </Fragment>
            </Router>
            
        )
    }
}

export default Header
