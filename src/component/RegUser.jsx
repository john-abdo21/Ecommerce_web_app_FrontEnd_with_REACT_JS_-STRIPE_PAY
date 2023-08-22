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
            confirm_password : '',
            resCondition : ''
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
            if(response.status == 200){
                this.setState({resCondition : response.data.message});
            }
            if(response.data.message == 'Successful!!! Check Your Mail For Verification Code. After Verifying With That You Can Login !'){
                setTimeout(()=>{window.location.reload();},1500);
                setTimeout(()=>{window.location.href = '/verifyEmail';},1500);
            }
            
        }catch(error){
            console.log(error)
        }

    }

    resUserCond = ()=>{
        if(this.state.resCondition == '"image" is not allowed'){
                return <div className='text-center headfont'>
                <p>Image must be a jpg image within 500kb.</p>
                </div>
            }
            else{
                return <div className='text-center headfont'>
                <p>{this.state.resCondition}</p>
                </div>
            }
            
        }else{
            return <div className='text-center headfont'>
                <h5>Please Enter Valid Email and Information ...<br/>Image Can only Be Jpg or Jpeg Formated.<br></br>Your Image & Mail Is Not Changeable in Future ... So, Be Careful.</h5>
            </div>
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
                        <div className='col col-md-12 mb-5 alertshadw'>{this.resUserCond()}</div>
                    </div>
                    <form method="POST"  encType='multipart/form-data'>
                        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({name : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="First & Last Name" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({email : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Email@" aria-label=".form-control-sm example" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Please Insert Valid Email or Verification Wont Work."/></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({dateofbirth : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="date" placeholder="Date of Birth" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({age : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="number" min="1" max="100" placeholder="Age" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({gender : e.target.value})}} autocomplete="off" className="form-select frmshape" aria-label="Default select example">
                            <option selected disabled>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                            </select></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({country : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Country" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({address : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Address" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({delivery : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Delivery Address" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({phoneNumber : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Phone Number" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({image : e.target.files[0]})}} className="form-control form-control-sm frmshape" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Profile Image Here." id="formFileSm" type="file" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({password : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Password" aria-label=".form-control-sm example" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip" data-bs-title="Password Must Be 8-50 Digit Long, Must Not Have Anything Outside a-z, A-Z, 0-9, !,@,*"/></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({confirm_password : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Confirm Password" aria-label=".form-control-sm example" /></div>
                            <div className='col d-flex justify-content-center smaline mb-3'>Want to sell ? Register Here ... &nbsp;<Link className='loginLink' to='/regSeller'>click me</Link></div>
                            
                            <div className='col col-md-10 d-flex justify-content-center mb-3'><button onClick={(e)=>{this.regUser(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><AppRegistrationIcon /> Register</button></div>
                            </div>
                    </form>
                </div>

            </Fragment>
        )
    }
}

export default RegUser
