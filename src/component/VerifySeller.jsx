import React, { Component,Fragment } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import KeyIcon from '@mui/icons-material/Key';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
    BrowserRouter as Router,
    useParams,
    useLocation,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    

export class VerifySeller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellVerf : [],
            name : '',
            image : '',
            email : '',
            address : '',
            age : '',
            nid_image : '',
            slno : null ,
            date_of_birth : '',
            gender : '',
            phone : '',
            country : '',
            afterClick : false,
            afterStatus : ''
        }
    }
    
    showSellerData = ()=>{

            const {sellerSln} = this.props.match.params;
            return   <div className='col mb-5 mincardbd'>
            <div className="card cardanim">
        
            <img src={this.state.image} className='card-img-top cardImg'></img>
            
            <div className="card-body">
            <p className="card-title"><AccountCircleIcon /><span className='boldcardtxt headfontres'>{this.state.name}</span></p>
            <p className="card-text txtsize bdfontres"><span className='boldcardtxt'>Email :</span> {this.state.email}<br></br><span className='boldcardtxt'>Date of Birth :</span> {this.state.date_of_birth.split('T',1)}<br></br><span className='boldcardtxt'>Age :</span> {this.state.age}<br></br><span className='boldcardtxt'>Gender :</span> {this.state.gender} <br></br><span className='boldcardtxt'>Phone Number :</span> {this.state.phone} <br></br><span className='boldcardtxt'>Country :</span> {this.state.country}<br></br><span className='boldcardtxt'>Address :<br></br></span> {this.state.address}</p>
            <Link to="#" onClick={(e)=>{this.verfSeller(e, sellerSln)}} class="desbtn btn-primary bdfont"><SettingsIcon fontSize='small' />Varify</Link> <Link to="#" onClick={(e)=>{this.rejSeller(e, sellerSln)}} class="desbtn btn-primary bdfont"><SettingsIcon fontSize='small' />Reject</Link>
            </div>
            </div>
            </div>
        
    }

    rejSeller = async (e, sellerSln)=>{
        try{
            const response = await axios.get(`/rejThisSeller/${localStorage.getItem('slno')}/${sellerSln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Successfully Rejected!!!'){
                this.setState({
                    afterStatus : response.data.message
                })

                setTimeout(()=>{window.location.href= '/verfSellerAll'},1500)
            }

        }catch(error){
            console.log(error)
        }
    }

    verfSeller = async (e, sellerSln)=>{
        try{
            const response = await axios.get(`/verfThisSeller/${localStorage.getItem('slno')}/${sellerSln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Successfully Added!!!'){
                this.setState({
                    afterStatus : response.data.message
                })

                setTimeout(()=>{window.location.href= '/verfSellerAll'},1000)
            }

        }catch(error){
            console.log(error)
        }
    }

    async componentDidMount(){
        window.$('[data-bs-toggle="tooltip"]').tooltip();
        const {sellerSln} = this.props.match.params;
        try{
            const response = await axios.get(`/verfSpecificSeller/${localStorage.getItem('slno')}/${sellerSln}`, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                this.setState({
                    sellVerf : response.data.sellerData
                })
                
                this.setState({
                    name : response.data.sellerData[0].name,
                    email : response.data.sellerData[0].email,
                    image : response.data.sellerData[0].image,
                    address : response.data.sellerData[0].address,
                    age : response.data.sellerData[0].age,
                    country : response.data.sellerData[0].country,
                    phone : response.data.sellerData[0].mobile,
                    nid_image : response.data.sellerData[0].nid_image,
                    date_of_birth : response.data.sellerData[0].date_of_birth,
                    gender : response.data.sellerData[0].gender
                })
            }
            console.log(this.state)
            
           

        }catch(error){
            console.log(error)
        }
        console.log(sellerSln)
    }

    showAfter = (e)=>{
        if(this.state.afterStatus != ''){
            return  <div className='text-center'><p>{this.state.afterStatus}</p></div>
        }else{
            return  <div className='text-center headfont'><h4>All Data Regarding Seller :</h4></div>
        }
    }
  render() {
        return (
            <Fragment>
            <div className='container-fluid editEmp d-flex flex-column p-5'>
            <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
                <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center'>{this.showAfter()}</div>
            </div>
            {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 mt-5 justify-content-center'>
            <div className='col mb-5 mincardbd'><div className="card cardanim"><img src={this.state.nid_image} className='card-img-top cardImg' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" data-bs-title="Seller NID Image ... Make Sure To Check Address And NID Number From It."></img></div></div>
        {this.showSellerData()}
        
        
            </div> : 
            <div className='row row-cols-1 row-cols-md-4 mt-5 justify-content-center'>

                <div className='col mb-5 mincardbd'><div className="card cardanim"><img src={this.state.nid_image} className='card-img-top cardImg' data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" data-bs-title="Seller NID Image ... Make Sure To Check Address And NID Number From It."></img></div></div>
                {this.showSellerData()}

            
            </div>}
            

            </div>
            </Fragment>
        )
  }
}

export default VerifySeller
