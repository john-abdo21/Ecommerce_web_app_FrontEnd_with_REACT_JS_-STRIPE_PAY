import React, { Component, Fragment } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import KeyIcon from '@mui/icons-material/Key';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    

export class ChangeEmp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name : '',
            email : '',
            dateofbirth : '',
            nid : null,
            gender : '',
            country : '',
            address : '',
           
            phoneNumber : '',       
            designation : '',
            sallery : null,
            resCondition : '',
            genPass : '',
            empData : []
        }
        
    }

    resUserCond = ()=>{
        if(this.state.resCondition != ''){
            return  <div className='text-center headfont'>
                <p>{this.state.resCondition}</p>
            </div>
        }else{
            return  <div className='text-center headfont'>
                <h4>Make Sure To Edit Information Carefully And Don't Leave Any Field Empty ...</h4>
            </div>
        }
    }

    regEmp = async (e)=>{
        e.preventDefault();

        const {empSlno} = this.props.match.params;

        const formData = new FormData();

        formData.append('name',this.state.name);
        formData.append('mail',this.state.email);
        formData.append('dateofBirth',this.state.dateofbirth);
        formData.append('nid',this.state.nid);
        formData.append('gender',this.state.gender);
        formData.append('country',this.state.country);
        formData.append('address',this.state.address);    
        formData.append('phoneNumber',this.state.phoneNumber);
        formData.append('designation',this.state.designation);
        formData.append('sallery',this.state.sallery);
       

        try{
            const response = await axios.post(`/editEmployee/${localStorage.getItem('slno')}/${empSlno}`, formData, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            
            
                
            if(response.data.message == 'Successfully Edited!!!'){
                this.setState({
                    name : '',
                    email : '',
                    dateofbirth : '',
                    nid : null,
                    gender : '',
                    country : '',
                    address : '',                  
                    phoneNumber : '',              
                    designation : '',
                    sallery : null,
                    resCondition : '',
                    genPass : ''
                },()=>{
                    this.componentDidMount();
                });

                const inputFields = document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], input[type="file"], select');

    // Loop through all the input fields and set their values to an empty string
                inputFields.forEach((input) => {
                    input.value = '';
                });

                
            }
            this.setState({resCondition : response.data.message});
            
        }catch(error){
            console.log(error)
        }

    }

    async componentDidMount(){
        const {empSlno} = this.props.match.params;
        try{
            const res = await axios.get(`/parseEmp/${localStorage.getItem('slno')}/${empSlno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            const [response] = await Promise.all([res])
            if(response.status == 200){

            console.log(response.data)

            this.setState({
                name : response.data.name,
                email : response.data.email,
                dateofbirth : response.data.dateofBirth.split('T',1),
                nid : response.data.nid,
                gender : response.data.gender,
                country : response.data.country,
                address : response.data.address,
                phoneNumber : response.data.mobile,       
                designation : response.data.designation,
                sallery : response.data.sallery,
            })

            }
        }catch(error){
            console.log(error)
        }
    }
    
    render() {
        return (
        <Fragment>
            <div className="container-fluid addEmp align-items-center flex-column">
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                    <div className='col col-md-12 mb-5 alertshadw'>{this.resUserCond()}</div>
                </div>
                <form method="POST">
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({name : e.target.value})}} value={this.state.name} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="First & Last Name" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({email : e.target.value})}} value={this.state.email} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Email@" aria-label=".form-control-sm example" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Please Insert Valid Email or Verification Wont Work."/></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({dateofbirth : e.target.value})}} value={this.state.dateofbirth} data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip" data-bs-title="Insert User Birth Date." autocomplete="off" className="form-control form-control-sm frmshape" type="date" placeholder="Date of Birth" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({nid : e.target.value})}} value={this.state.nid} autocomplete="off" className="form-control form-control-sm frmshape" type="number" min="1" placeholder="Nid Number" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({gender : e.target.value})}} value={this.state.gender} autocomplete="off" className="form-select frmshape" aria-label="Default select example">
                        <option selected disabled>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                        </select></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({country : e.target.value})}} value={this.state.country} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Country" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({address : e.target.value})}} value={this.state.address} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Address" aria-label=".form-control-sm example" /></div>
                        
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({phoneNumber : e.target.value})}} value={this.state.phoneNumber} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Phone Number" aria-label=".form-control-sm example" /></div>
                       
                        
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({designation : e.target.value})}} value={this.state.designation} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Designation" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({sallery : e.target.value})}} value={this.state.sallery} autocomplete="off" className="form-control form-control-sm frmshape" type="number" min="1000" placeholder="Sallery" aria-label=".form-control-sm example" /></div>

                        
                        
                        
                        
                        <div className='col col-md-10 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.regEmp(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><AppRegistrationIcon /> Edit Employee</button></div>
                    </div>
                </form>
            </div>
        </Fragment>
        )
    }
}

export default ChangeEmp
