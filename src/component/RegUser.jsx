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
    constructor(){
        super();
        this.state = {
            name : '',
            email : '',
            dateofbirth : '',
            age : null,
            gender : '',
            country : '',
            address : '',
            delivery : '',
            phoneNumber : '',
            image : null,
            password : '',
            confirm_password : ''
        }
    }

    regUser = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('mail',this.state.email);
        formData.append('dateofBirth',this.state.dateofbirth);
        formData.append('age',this.state.age);
        formData.append('gender',this.state.gender);
        formData.append('country',this.state.country);
        formData.append('address',this.state.address);
        formData.append('delivery',this.state.delivery);
        formData.append('phoneNumber',this.state.phoneNumber);
        formData.append('image',this.state.image);
        formData.append('password',this.state.password);
        formData.append('confirm_password',this.state.confirm_password);

        try{
            const response = await axios.post('/regUser', formData, {
                'headers' : {
                    'Content-Type' : 'multipart/form-data'
                }
            })

            console.log(response.data)
        }catch(error){
            console.log(error)
        }

    }

    componentDidMount(){
        window.$('[data-bs-toggle="tooltip"]').tooltip();
    }
    
    render() {
 
        return (
            <Fragment>
                <div className='container-fluid login d-flex justify-content-center align-items-center flex-column'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                        <div className='col col-md-12 mb-5 alertshadw'><p>Please Enter Valid Email and Information ...<br/>Image Can only Be Jpg or Jpeg Formated.</p></div>
                    </div>
                    <form method="POST"  encType='multipart/form-data'>
                        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({name : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Full Name" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({email : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Email@" aria-label=".form-control-sm example" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Please Insert Valid Email or Verification Wont Work."/></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({dateofbirth : e.target.value})}} className="form-control form-control-sm" type="date" placeholder="Date of Birth" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({age : e.target.value})}} className="form-control form-control-sm" type="number" min="1" max="100" placeholder="Age" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({gender : e.target.value})}} class="form-select" aria-label="Default select example">
                            <option selected disabled>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                            </select></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({country : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Country" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({address : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Address" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({delivery : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Delivery Address" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({phoneNumber : e.target.value})}} className="form-control form-control-sm" type="number" placeholder="Phone Number" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({image : e.target.files[0]})}} className="form-control form-control-sm" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Profile Image Here." id="formFileSm" type="file" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({password : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Password" aria-label=".form-control-sm example" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip" data-bs-title="Password Must Be 8-50 Digit Long, Must Not Have Anything Outside a-z, A-Z, 0-9, !,@,_"/></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({confirm_password : e.target.value})}} className="form-control form-control-sm" type="text" placeholder="Confirm Password" aria-label=".form-control-sm example" /></div>
                            <div className='col d-flex justify-content-center smaline mb-3'>Want to sell ? Register Here ... &nbsp;<Link className='loginLink' to='/regSeller'>click me</Link></div>
                            
                            <div className='col col-md-10 d-flex justify-content-center mb-3'><button onClick={(e)=>{this.resUser(e)}} type="button" class="btn btn-sm btn-outline-info"><AppRegistrationIcon /> Register</button></div>
                            </div>
                    </form>
                </div>

            </Fragment>
        )
    }
}

export default RegUser
