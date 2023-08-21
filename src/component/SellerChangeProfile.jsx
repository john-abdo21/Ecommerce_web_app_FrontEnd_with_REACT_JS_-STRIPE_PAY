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


export class SellerChangeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            dateofbirth : '',
            age : null,
            gender : '',
            country : '',
            address : '',
            phoneNumber : '',
            resCondition : ''
        }
    }
    
    EditSeller = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('dateofBirth',this.state.dateofbirth);
        formData.append('age',this.state.age);
        formData.append('gender',this.state.gender);
        formData.append('country',this.state.country);
        formData.append('address',this.state.address);
        formData.append('phoneNumber',this.state.phoneNumber);
      
   

        try{
            const response = await axios.post(`/editSeller/${localStorage.getItem('slno')}`, formData, {
                'headers' : {
                    'Content-Type' : 'application/json'
                }
            })
            if(response.status == 200){
                if(response.data.message == 'Successful!!! You will be mailed once you are varified by our authority !'){
                    localStorage.clear();
                    setTimeout(()=>{window.location.href = '/'},1500);
                    setTimeout(()=>{window.location.reload()},1500);
                }
                this.setState({resCondition : response.data.message});
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
                <p>Please Enter Valid Email and Information ...<br/>Image Can only Be Jpg or Jpeg Formated.<br></br>Your Image & Mail Is Not Changeable Due To Security Reasons ...</p>
            </div>
        }
    }

    async componentDidMount(){
        try{
            const   res = await  axios.get(`/needsellerData/${localStorage.getItem('slno')}`,{
                headers : {
                    'Content-Type' : 'application.json'
                }
            });

            const [response] = await Promise.all ([res])
            if(response.data.message == 'Success'){
                this.setState({
                    name : response.data.sellerData[0].name,
                    dateofbirth : response.data.sellerData[0].date_of_birth.split('T',1),
                    age : response.data.sellerData[0].age,
                    gender : response.data.sellerData[0].gender,
                    country : response.data.sellerData[0].country,
                    address : response.data.sellerData[0].address,
                    phoneNumber : response.data.sellerData[0].mobile
                });
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
                    <div className='col col-md-10 mb-2'><input onChange={(e)=>{this.setState({name : e.target.value})}} value={this.state.name} className="form-control form-control-sm frmshape" type="text" placeholder="First & Last Name" aria-label=".form-control-sm example" /></div>

                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({dateofbirth : e.target.value})}} value={this.state.dateofbirth} className="form-control form-control-sm frmshape" type="date" placeholder="Date of Birth" aria-label=".form-control-sm example" /></div>
                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({age : e.target.value})}} value={this.state.age} className="form-control form-control-sm frmshape" type="number" min="1" max="100" placeholder="Age" aria-label=".form-control-sm example" /></div>
                    <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({gender : e.target.value})}} value={this.state.gender} className="form-select frmshape" aria-label="Default select example">
                    <option selected disabled>Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                    </select></div>
                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({country : e.target.value})}} value={this.state.country} className="form-control form-control-sm frmshape" type="text" placeholder="Country" aria-label=".form-control-sm example" /></div>
                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({address : e.target.value})}} value={this.state.address} className="form-control form-control-sm frmshape" type="text" placeholder="Address" aria-label=".form-control-sm example" /></div>
                    <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({phoneNumber : e.target.value})}} value={this.state.phoneNumber} className="form-control form-control-sm frmshape" type="text" placeholder="Phone Number" aria-label=".form-control-sm example" /></div>
                    
                    <div className='col col-md-10 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.EditSeller(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><AppRegistrationIcon /> Edit Submit</button></div>
                    </div>
            </form>
            </div>
            </Fragment>
        )
    }
}

export default SellerChangeProfile
