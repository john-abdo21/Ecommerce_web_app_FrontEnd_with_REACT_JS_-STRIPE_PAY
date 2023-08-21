import React, { Component,Fragment } from 'react'
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

export class MainVerfSeller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sellVerf : []
        }
    }
    
    async componentDidMount(){
        try{

            const response = await axios.get(`/verfSellerData/${localStorage.getItem('slno')}`, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Successful'){
                this.setState({
                    sellVerf : response.data.verfSeller
                })
            }

            console.log(this.state.sellVerf.length)

        }catch(error){
            console.log(error)
        }
    }

    showSellerData = ()=>{
        if(this.state.sellVerf.length>1){
        return  this.state.sellVerf.map((perSeller)=>{
            return   <div className='col mb-5 mincardbd' key={perSeller.slno}>
                        <div className="card cardanim">
                    
                        <img src={perSeller.image} className='card-img-top cardImg'></img>
                        
                        <div className="card-body">
                        <p className="card-title"><AccountCircleIcon /><span className='boldcardtxt fsize'>{perSeller.name[0].toUpperCase()+perSeller.name.slice(1)}</span></p>
                        <p className="card-text txtsize"><span className='boldcardtxt'>Email :</span> {perSeller.email}<br></br><span className='boldcardtxt'>Date of Birth :</span> {perSeller.date_of_birth.split('T',1)}<br></br><span className='boldcardtxt'>Gender :</span> {perSeller.gender[0].toUpperCase()+perSeller.gender.slice(1)} <br></br><span className='boldcardtxt'>Phone Number :</span> {perSeller.mobile} <br></br><span className='boldcardtxt'>Country :</span> {perSeller.country}<br></br><span className='boldcardtxt'>Address :<br></br></span> {perSeller.address}</p>
                        <Link to={'/verfSeller/'+perSeller.slno} class="desbtn btn-primary"><SettingsIcon fontSize='small' /> Check Seller</Link>
                        </div>
                        </div>
                    </div>
        })
        }else if(this.state.sellVerf.length>0){
            const perSeller = this.state.sellVerf[0];
            return   <div className='col mb-5 mincardbd'>
            <div className="card cardanim">
        
            <img src={perSeller.image} className='card-img-top cardImg'></img>
            
            <div className="card-body">
            <p className="card-title"><AccountCircleIcon /><span className='boldcardtxt headfontres'>{perSeller.name[0].toUpperCase()+perSeller.name.slice(1)}</span></p>
            <p className="card-text txtsize bdfontres"><span className='boldcardtxt'>Email :</span> {perSeller.email}<br></br><span className='boldcardtxt'>Date of Birth :</span> {perSeller.date_of_birth.split('T',1)}<br></br><span className='boldcardtxt'>Gender :</span> {perSeller.gender[0].toUpperCase()+perSeller.gender.slice(1)} <br></br><span className='boldcardtxt'>Phone Number :</span> {perSeller.mobile} <br></br><span className='boldcardtxt'>Country :</span> {perSeller.country}<br></br><span className='boldcardtxt'>Address :<br></br></span> {perSeller.address}</p>
            <Link to={'/verfSeller/'+perSeller.slno} class="desbtn btn-primary bdfont"><SettingsIcon fontSize='small' /> Check Seller</Link>
            </div>
            </div>
        </div>
        }
    }

  render() {
    return (
        <Fragment>
            <div className='container-fluid editEmp d-flex flex-column p-5'>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
                    <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center headfont'><h4>All Sellers Who Need Verification :</h4></div>
                </div>
                {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 mt-5 justify-content-center'>

                {this.showSellerData()}
            
            
                </div> : 
                <div className='row row-cols-1 row-cols-md-4 mt-5 justify-content-center'>


                    {this.showSellerData()}

            
                </div>}
            

            </div>
        </Fragment>
    )
  }
}

export default MainVerfSeller
