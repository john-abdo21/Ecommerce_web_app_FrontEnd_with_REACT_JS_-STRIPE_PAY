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

export class UserChangeProfile extends Component {
    constructor(){
        super();
        this.state = {
            name : '',
            dateofbirth : '',
            age : null,
            gender : '',
            country : '',
            address : '',
            delivery : '',
            phoneNumber : '',

            resCondition : ''
        }
    }

    EditUser = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('dateofBirth',this.state.dateofbirth);
        formData.append('age',this.state.age);
        formData.append('gender',this.state.gender);
        formData.append('country',this.state.country);
        formData.append('address',this.state.address);
        formData.append('delivery',this.state.delivery);
        formData.append('phoneNumber',this.state.phoneNumber);


        try{
            const response = await axios.post(`/EditUser/${localStorage.getItem('slno')}`, formData, {
                'headers' : {
                    'Content-Type' : 'application/json'
                }
            })
            if(response.status == 200){
                this.setState({resCondition : response.data.message});
            }
            if(response.data.message == 'Successful!!! Please Login Again To Your Id.'){
                localStorage.clear();
                setTimeout(()=>{window.location.reload()},1500);
                setTimeout(()=>{window.location.href = '/'},1500);
            }
            
        }catch(error){
            console.log(error)
        }

    }

    resUserCond = ()=>{
        if(this.state.resCondition != ''){
            return <div className='text-center headfont'>
                <p>{this.state.resCondition}</p>
            </div>
        }else{
            return <div className='text-center headfont'>
                <p className='mx-auto'>Please Enter Valid Email and Information ...<br/>Image Can only Be Jpg or Jpeg Formated.<br></br>Your Image, Mail & Password Is Not Changeable Due To Security Reasons...</p>
            </div>
        }
    }

    async componentDidMount(){
        window.$('[data-bs-toggle="tooltip"]').tooltip();
        try{
            const res = await axios.get(`/getmyalldata/${localStorage.getItem('slno')}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            const [response] = await Promise.all([res]);
            if(response.data.message == 'Success'){

                this.setState({
                    name : response.data.userData[0].name,
                    dateofbirth : response.data.userData[0].date_of_birth.split('T',1),
                    age : response.data.userData[0].age,
                    gender : response.data.userData[0].gender,
                    country : response.data.userData[0].country,
                    address : response.data.userData[0].address,
                    delivery : response.data.userData[0].delivery_address,
                    phoneNumber : response.data.userData[0].mobile
                })
            }
        }catch(error){
            console.log(error)
        }
    }
    
    render() {
 
        return (
            <Fragment>
                <div className='container-fluid login d-flex justify-content-center align-items-center flex-column'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                        <div className='col col-md-12 mb-5 alertshadw'>{this.resUserCond()}</div>
                    </div>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                    <div className='col mb-5 mincardbd' >
                    <div className="card cardanim">
                   
                    <img src={localStorage.getItem('image')} className='card-img-top cardImg2'></img>
                    
                    
                    </div>
                    </div>
                    </div>
                    <form method="POST"  encType='multipart/form-data'>
                        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({name : e.target.value})}} value={this.state.name} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="First & Last Name" aria-label=".form-control-sm example" /></div>
                          
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({dateofbirth : e.target.value})}} value={this.state.dateofbirth} autocomplete="off" className="form-control form-control-sm frmshape" type="date" placeholder="Date of Birth" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({age : e.target.value})}} value={this.state.age} autocomplete="off" className="form-control form-control-sm frmshape" type="number" min="1" max="100" placeholder="Age" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({gender : e.target.value})}} value={this.state.gender} autocomplete="off" className="form-select frmshape" aria-label="Default select example">
                            <option selected disabled>Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                            </select></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({country : e.target.value})}} value={this.state.country} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Country" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({address : e.target.value})}} value={this.state.address} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Address" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({delivery : e.target.value})}} value={this.state.delivery} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Delivery Address" aria-label=".form-control-sm example" /></div>
                            <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({phoneNumber : e.target.value})}} value={this.state.phoneNumber} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Phone Number" aria-label=".form-control-sm example" /></div>
                           
                          
                           
                            
                            <div className='col col-md-10 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.EditUser(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><AppRegistrationIcon /> Edit Submit</button></div>
                            </div>
                    </form>
                </div>

            </Fragment>
        )
    }
}

export default UserChangeProfile
