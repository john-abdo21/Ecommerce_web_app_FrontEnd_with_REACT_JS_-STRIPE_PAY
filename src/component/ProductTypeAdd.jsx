import React, { Component, Fragment } from 'react'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

import DeleteIcon from '@mui/icons-material/Delete';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    




export class ProductTypeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product : '',
            resData : '',
            productTypes : [],
            image : null,
        }
    }
    
    addProductType = async (e)=>{
        const formData = new FormData();
        formData.append('productType',this.state.product);
        formData.append('image',this.state.image);
        try{
            const response = await axios.post(`/appProductType/${localStorage.getItem('slno')}`, formData, {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            });

            if(response.data.message == 'Successfully Added Product Type ...'){
                this.setState({
                    product : '',
                    image : null
                })

                const inpfield = document.querySelectorAll('input[type="text"]');
               
                    inpfield[0].value = '';
                

                this.componentDidMount();
                setTimeout(()=>{this.setState({resData : ''})},900)
            }

            this.setState({
                resData : response.data.message
            });

        }catch(error){
            console.log(error)
        }
    }

    renderMessage=()=>{
        if(this.state.resData != ''){
            return  <div className='text-center headfont'>
                <p>{this.state.resData}</p>
            </div>
        }else{
            return <div className='text-center headfont'>
                <h4>Please Enter New Product Type :</h4>
            </div>
        }
    }

    async componentDidMount(){
        try{
            const response = await axios.get(`/seeProductTypes/${localStorage.getItem('slno')}`, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            if(response.data.message = 'Success'){
                this.setState({
                    productTypes : response.data.productType
                });
            }

            console.log(this.state.productTypes)

        }catch(error){
            console.log(error)
        }
    }

    showProdData = ()=>{
        return  this.state.productTypes.map((perProd)=>{
            return   <div className='col mb-5 mincardbd' key={perProd.slno}>
            <div className="card cardanim">
           
            
            
            <div className="card-body bordcardbd d-flex justify-content-center flex-column">
              <p className="card-title d-flex justify-content-center"><ReportGmailerrorredIcon /> &nbsp;<span className='boldcardtxt headfont'>{perProd.type[0].toUpperCase()+perProd.type.slice(1)}</span></p>

            <Link to="#" onClick={(e)=>{this.delType(e, perProd.slno)}} className="desbtn btn-primary bdfont"><DeleteIcon fontSize='small' /> Delete</Link>
            </div>
            </div>
            </div>
        })
    }

    delType = async (e, Prdsln)=>{
        try{
            const response = await axios.get(`/delProdType/${localStorage.getItem('slno')}/${Prdsln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            if(response.data.message == 'Success'){
                this.componentDidMount();
            }
        }catch(error){
            console.log(error)
        }
    }

  render() {
    return (
        <Fragment>
            <div className='container-fluid login d-flex justify-content-center align-items-center flex-column'>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0'>
                    <div className='col col-md-12 mb-5 alertshadw'>{this.renderMessage()}</div>
                </div>
                <form method="POST">
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                        <div className='col col-md-7 mb-2'><input onChange={(e)=>{this.setState({product : e.target.value})}} className="form-control form-control-sm frmshape" type="text" placeholder="Add Product Type" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-7 mb-2'><input onChange={(e)=>{this.setState({image : e.target.files[0]})}} className="form-control form-control-sm frmshape" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Type Image in Jpg or Jpeg." id="formFileSm" type="file" /></div>
                        
                        <div className='col col-md-6 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.addProductType(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><ProductionQuantityLimitsIcon /> Add Product Type</button></div>
                        

                    </div>
                </form>
            </div>
            <div className='container-fluid editEmp d-flex justify-content-center flex-column topborder p-5'>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
                    <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center headfont'><h4>All Products Types :</h4></div>
                </div>
                {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 mt-5 justify-content-center'>

                {this.showProdData()}
            
            
            </div> : 
            <div className='row row-cols-1 row-cols-md-4 mt-5 justify-content-center'>


                {this.showProdData()}

            
            </div>}
                
            </div>


        </Fragment>
    )
  }
}

export default ProductTypeAdd
