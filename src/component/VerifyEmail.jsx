import React, { Component, Fragment } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";
import Face6Icon from '@mui/icons-material/Face6';    

import axios from 'axios'; 

export class VerifyEmail extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            code : '',
            resCondition : ''
        }
    }

    sendCode = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('email',this.state.email);
        formData.append('code',this.state.code);

        try{
            const response = await axios.post('/verifyUser', formData,{
                'headers' : {
                    'Content-Type' : 'application/json'
                }
            })
            this.setState({resCondition : response.data.message});
            if(response.data.message == 'Successfully Verified...Now You Can Do Log In Login Page.'){
                document.getElementById('mail').value = '';
                document.getElementById('code').value = '';
            }

        }catch(error){
            console.log(error);
        }
    }

    showCond = ()=>{
        if(this.state.resCondition != ''){
            return  <div className='text-center headfont'>
                <p>{this.state.resCondition}</p>
            </div>
        }else{
            return  <div className='text-center headfont'>
            <h4>Please Enter Valid Email and Verification Code ...</h4>
            </div>
        }
    }
  render() {
    return (
        <Fragment>
            <div className='container-fluid login d-flex justify-content-center align-items-center flex-column'>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                    <div className='col col-md-12 mb-5 alertshadw'>{this.showCond()}</div>
                </div>
                <form method="POST"  encType='multipart/form-data'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                        <div className='col col-md-7 mb-2'><input id='mail' onChange={(e)=>{this.setState({email : e.target.value})}} className="form-control form-control-sm frmshape" type="text" placeholder="Email@" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-7 mb-3'><input id='code' onChange={(e)=>{this.setState({code : e.target.value})}} className="form-control form-control-sm frmshape" type="text" placeholder="Verification Code" aria-label=".form-control-sm example" /></div>

                        <div className='col col-md-10 d-flex justify-content-center mt-2 mb-3'><button onClick={(e)=>{this.sendCode(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><Face6Icon /> Verify!</button></div>


                    </div>
                </form>
            </div>
        </Fragment>
    )
  }
}

export default VerifyEmail
