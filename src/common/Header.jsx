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
const RegUser = React.lazy(()=>import('../component/RegUser'));
const RegSeller = React.lazy(()=>import('../component/RegSeller'));



export class Header extends Component {
    constructor(){
        super();
        this.state = {
            image : '',
            slno : '',
            role : ''
        }
    }
    
    BootstrapSpinnerLoader = ()=> {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div class="spinner-grow text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        );
    }

    componentDidMount(){

        if(localStorage.getItem('slno')){
            axios.get(`/amilogged/${localStorage.getItem('token')}`,{
                'headers' : {
                    'Content-Type' : 'application/json'
                }
            }).then(response=>{
                if(response.status === 200){
                    if(response.data.message == 'Yes'){
                        
                        this.setState({
                            image : localStorage.getItem('image'),
                            slno : localStorage.getItem('slno'),
                            role : localStorage.getItem('role')
                        
                        });
                    }else if(response.data.message == 'No'){
                        
                        localStorage.clear();
                    }
                }
                console.log(this.state)
            }).catch(error=>{console.log(error)})
        }

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
                            <Route exact path='/regUser' component={()=>(<RegUser />)} />
                            <Route exact path='/regSeller' component={()=>(<RegSeller/>)} />

                        </switch>
                    </Suspense>

                </Fragment>
            </Router>
            
        )
    }
}

export default Header
