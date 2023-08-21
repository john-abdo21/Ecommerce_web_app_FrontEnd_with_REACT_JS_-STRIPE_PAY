import React, { Component, Fragment } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SweetAlert2 from 'react-sweetalert2';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';  

export class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            role : '',
            swal: {}
        }
    }

    forgotPass =async (e)=>{
        try{
            const response = await axios({
                url : `/forgotmypassuwu`,
                method : 'post',
                data : {
                    mail : this.state.email,
                    role : this.state.role
                }
            });

            if(response.data.message == 'Success'){
                this.setState({
                    swal: {
                        show: true,
                        title: 'You Are Given A New Password To LogIn.',
                        text: 'Thanks For Your Continuous Support. Thanks, For Chosing Us For Your Daily Life ...'
                    }
                });

                this.setState({
                    email : '',
                    role : ''
                })

                document.getElementById('txtbox').value = '';
                document.getElementById('txtbox2').value = '';
            }
        }catch(err){
            console.log(err)
        }
    }
    
  render() {
    return (
        <Fragment>
        <div className='container-fluid login d-flex justify-content-center align-items-center flex-column'>
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
            <div className='col col-md-12 mb-5 alertshadw text-center'>Kindly Input Your Account EMail Id, A New Password Will Be Sent There ...</div>
        </div>
        <form method="POST"  encType='multipart/form-data'>
            <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                <div className='col col-md-7 mb-2'><input id="txtbox" onChange={(e)=>{this.setState({email : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Insert Account Email" aria-label=".form-control-sm example" /></div>
               
                <div className='col col-md-7 mb-2'><select id="txtbox2" onChange={(e)=>{this.setState({role : e.target.value})}} autocomplete="off" className="form-select frmshape" aria-label="Default select example">
                            <option selected disabled>Are You User/Seller ?</option>
                            <option value="User">User</option>
                            <option value="Seller">Seller</option>
                           
                            </select></div>


                <div className='col col-md-10 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.forgotPass(e)}} type="button" className="btn btn-sm btn-outline-info"><AppRegistrationIcon /> Send New Password</button></div>
                </div>
        </form>
        <SweetAlert2 {...this.state.swal} />
        </div>

        </Fragment>
    )
  }
}

export default ForgotPass
