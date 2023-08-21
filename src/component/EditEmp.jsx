import React, { Component,Fragment } from 'react';
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
    withRouter
    } from "react-router-dom";

import axios from 'axios';    


export class EditEmp extends Component {
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
            joined : null,
            phoneNumber : '',
            image : null,
            password : '',
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
                <h4>Make Sure To Add Information Carefully And Don't Leave Any Field Empty ...</h4>
            </div>
        }
    }

    regEmp = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('mail',this.state.email);
        formData.append('dateofBirth',this.state.dateofbirth);
        formData.append('nid',this.state.nid);
        formData.append('gender',this.state.gender);
        formData.append('country',this.state.country);
        formData.append('address',this.state.address);
        formData.append('joined',this.state.joined);
        formData.append('phoneNumber',this.state.phoneNumber);
        formData.append('image',this.state.image);
        formData.append('password',this.state.password);
        formData.append('designation',this.state.designation);
        formData.append('sallery',this.state.sallery);
       

        try{
            const response = await axios.post(`/regEmployee/${localStorage.getItem('slno')}`, formData, {
                'headers' : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            
            
                
            if(response.data.message == 'Successfully Added!!!'){
                this.setState({
                    name : '',
                    email : '',
                    dateofbirth : '',
                    nid : null,
                    gender : '',
                    country : '',
                    address : '',
                    joined : null,
                    phoneNumber : '',
                    image : null,
                    password : '',
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

    genPass = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.get('/genPass',{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                this.setState({
                    password : response.data.pass
                })
            }
        }catch(error){
            console.log(error)
        }
    }

    showEmpData = ()=>{
        return  this.state.empData.map((perEmp)=>{
            return   <div className='col mb-5 mincardbd' key={perEmp.slno}>
            <div className="card cardanim">
           
            <img src={perEmp.image} className='card-img-top cardImg'></img>
            
            <div className="card-body">
              <p className="card-title"><AccountCircleIcon /><span className='boldcardtxt fsize headfontres'>{perEmp.name[0].toUpperCase()+perEmp.name.slice(1)}</span></p>
              <p className="card-text txtsize bdfontres"><span className='boldcardtxt'>Email :</span> {perEmp.email}<br></br><span className='boldcardtxt'>Gender :</span> {perEmp.gender[0].toUpperCase()+perEmp.gender.slice(1)} <br></br><span className='boldcardtxt'>Joining Date :</span> {perEmp.joined.split('T',1)}<br></br><span className='boldcardtxt'>Phone Number :</span> {perEmp.mobile} <br></br><span className='boldcardtxt'>Designation :</span> {perEmp.designation[0].toUpperCase()+perEmp.designation.slice(1)}<br></br><span className='boldcardtxt'>Sallery :</span> {perEmp.sallery}<br></br><span className='boldcardtxt'>Address :<br></br></span> {perEmp.address}</p>
              <Link to={'/changeEmp/'+perEmp.slno} class="desbtn btn-primary bdfontres"><SettingsIcon fontSize='small' /> Edit</Link> <Link to="#" onClick={(e)=>{this.delEmp(e, perEmp.slno)}} className="desbtn btn-primary bdfont"><DeleteIcon fontSize='small' /> Delete</Link>
            </div>
            </div>
            </div>
        })
    }

    delEmp = async (e, empSl)=>{
        e.preventDefault();
        try{
            const response = await axios.get(`/delEmp/${localStorage.getItem('slno')}/${empSl}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                this.setState({
                    delSuc : 'Deleted'
                },()=>{
                    this.componentDidMount();
                })
            }
        }catch(error){
            console.log(error)
        }
    }

    async componentDidMount(){
        window.$('[data-bs-toggle="tooltip"]').tooltip();
        try{

            const response = await axios.get(`/empData/${localStorage.getItem('slno')}`, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Successful'){
                this.setState({
                    empData : response.data.empData
                })
            }

            console.log(this.state.empData.length)

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
                <form method="POST"  encType='multipart/form-data'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({name : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="First & Last Name" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({email : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Email@" aria-label=".form-control-sm example" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Please Insert Valid Email or Verification Wont Work."/></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({dateofbirth : e.target.value})}} data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip" data-bs-title="Insert User Birth Date." autocomplete="off" className="form-control form-control-sm frmshape" type="date" placeholder="Date of Birth" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({nid : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="number" min="1" placeholder="Nid Number" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({gender : e.target.value})}} autocomplete="off" className="form-select frmshape" aria-label="Default select example">
                        <option selected disabled>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                        </select></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({country : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Country" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({address : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Address" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({joined : e.target.value})}} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Joining Date Here." autocomplete="off" className="form-control form-control-sm frmshape" type="date" placeholder="Joining Date" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({phoneNumber : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Phone Number" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({image : e.target.files[0]})}} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert User Profile Image jpg or jpeg Here." className="form-control form-control-sm frmshape" id="formFileSm" type="file" /></div>
                        
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({designation : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Designation" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({sallery : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="number" min="1000" placeholder="Sallery" aria-label=".form-control-sm example" /></div>

                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({password : e.target.value})}} value={this.state.password} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Password" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><button onClick={(e)=>{this.genPass(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><KeyIcon /> Generate Password</button></div>
                        
                        
                        <div className='col col-md-10 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.regEmp(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><AppRegistrationIcon /> Add Employee</button></div>
                    </div>
                </form>
            </div>

            <div className='container-fluid editEmp d-flex flex-column p-5'>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
                    <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center headfont'><h4>All Employees List :</h4></div>
                </div>
                {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 mt-5 justify-content-center'>

                {this.showEmpData()}
            
            
            </div> : 
            <div className='row row-cols-1 row-cols-md-4 mt-5 justify-content-center'>


                {this.showEmpData()}

            
            </div>}
                

            </div>

        </Fragment>
        )
    }
}

export default EditEmp
