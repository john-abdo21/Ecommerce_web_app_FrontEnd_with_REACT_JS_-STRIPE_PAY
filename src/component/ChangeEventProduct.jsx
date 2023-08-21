import React, { Component,Fragment } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';
 

export class ChangeEventProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type : [],
            brand : [],
            resCondition : '',
            intro : '',
            desc : '',
            prdType : '',
            prdBrand : '',
            amountLeft : null,
            price : null,
            transform: '-100%',
            isInitialMount: true
        }
    }

    async componentDidMount(){
        const {productSln} = this.props.match.params;
        window.$('[data-bs-toggle="tooltip"]').tooltip();

        try{
            const res1 = await axios.get('/getPrdTyp',{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            const res2 = await axios.get('/getPrdBrnd',{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            const res3 = await axios.get(`/getMyOwnEventProduct/${localStorage.getItem('slno')}/${productSln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            const [response1, response2] = await Promise.all([res1, res2]);

            this.setState({
                type : response1.data.allType,
                brand : response2.data.allBrand,
                intro : res3.data.productData[0].name,
                prdType : res3.data.productData[0].type,
                prdBrand : res3.data.productData[0].brand,
                amountLeft : res3.data.productData[0].amount_left,
                price : res3.data.productData[0].price,
                desc : res3.data.productData[0].description
            })

            this.startOpacityChange();

            

        }catch(error){
            console.log(error);
        }
    }

    startOpacityChange() {
        this.setState({ transform: '-100%', isInitialMount: false });

        const intervalId = setInterval(() => {
          this.setState((prevState) => ({
            transform: `${Math.max(-100 + 1, 0)}`,
          }));
        }, 100); // Adjust the interval as needed
      
        setTimeout(() => clearInterval(intervalId), 1000); // Adjust the duration as needed
      }

      
    addPrdType=()=>{
        return  this.state.type.map((eachone)=>{
            return  <option value={eachone.type}>{eachone.type}</option>
        })
    }

    addPrdBrand=()=>{
        return  this.state.brand.map((eachone)=>{
            return  <option value={eachone.type}>{eachone.type}</option>
        })
    }

    resUserCond = ()=>{
        if(this.state.resCondition != ''){
            return <div className='text-center headfont'>
                <p>{this.state.resCondition}</p>
            </div>
        }else{
            return <div className='text-center headfont'>
                <p>Please Enter Valid Product Name & Information ...</p>
            </div>
        }
    }

    EditProduct = async(e)=>{
        const {productSln} = this.props.match.params;
        e.preventDefault();

        const formData = new FormData();
        formData.append('intro',this.state.intro);
        formData.append('desc',this.state.desc);
        formData.append('prdType',this.state.prdType);
        formData.append('prdBrand',this.state.prdBrand);
        formData.append('amountLeft',this.state.amountLeft);
        formData.append('price',this.state.price);
        
    

    try{
        const response = await axios.post(`/editMyEventProduct/${localStorage.getItem('slno')}/${productSln}`, formData, {
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(response.status == 200){
            this.setState({resCondition : response.data.message});
            if(response.data.message == 'Successfully Edited Product ...'){
                this.setState = {
                    intro : '',
                    desc : '',
                    prdType : '',
                    prdBrand : '',
                    amountLeft : null,
                    price : null    
                }
                
                const inputFields = document.querySelectorAll('input[type="text"], input[type="number"], select, textarea');

                // Loop through all the input fields and set their values to an empty string
                inputFields.forEach((input) => {
                    input.value = '';
                });
            }
        }
        
        
    }catch(error){
        console.log(error)
    }
    }
    
    async componentDidUpdate(prevProps){

        if (prevProps.componentId !== this.props.componentId && !this.state.isInitialMount) {
            this.startOpacityChange();
          }
  
        if (this.state.isInitialMount) {
              
              this.setState({ isInitialMount: false });
            }
        }


    render() {
        const { transform } = this.state;
        return (
            <Fragment>
                <div id="slide" className='container-fluid product d-flex justify-content-center align-items-center flex-column' style={{ transform: `translateX(${transform})` }}>
                <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
                    <div className='col col-md-12 mb-5 alertshadw'>{this.resUserCond()}</div>
                </div>
                <form method="POST"  encType='multipart/form-data'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                        <div className='col col-md-10 mb-2'><input onChange={(e)=>{this.setState({intro : e.target.value})}} value={this.state.intro} className="form-control form-control-sm frmshape" type="text" placeholder="Product Title" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Introduction in One Line." aria-label=".form-control-sm example" /></div>
                        
                        <div className='col col-md-10 mb-2'><textarea onChange={(e)=>{this.setState({desc : e.target.value})}} value={this.state.desc} className="form-control form-control-sm txtboxwidhigh frmshape" type="text" placeholder="Product Description" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Detailed Description." aria-label=".form-control-sm example"></textarea></div>
                        
                        <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({prdType : e.target.value})}} value={this.state.prdType} className="form-select frmshape" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Type." aria-label="Default select example">
                        <option selected disabled>Product Type</option>
                        {this.addPrdType()}
                        </select></div>


                        <div className='col col-md-5 mb-2'><select onChange={(e)=>{this.setState({prdBrand : e.target.value})}} value={this.state.prdBrand} className="form-select frmshape" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Brand." aria-label="Default select example">
                        <option selected disabled>Product Brand</option>
                        {this.addPrdBrand()}
                        </select></div>

                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({amountLeft : e.target.value})}} value={this.state.amountLeft} className="form-control form-control-sm frmshape" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product In Stock." type="number" placeholder="Amount In Stock" aria-label=".form-control-sm example" /></div>
                        <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({price : e.target.value})}} value={this.state.price} className="form-control form-control-sm frmshape" type="number" placeholder="Price $" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Product Price." aria-label=".form-control-sm example" /></div>
                        
                        
                        
                        
                        <div className='col col-md-10 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.EditProduct(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><AppRegistrationIcon /> Edit Product</button></div>
                        </div>
                </form>
                </div>

            </Fragment>
        )
    }
}

export default ChangeEventProduct
