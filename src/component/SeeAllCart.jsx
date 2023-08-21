import React, { Component, Fragment } from 'react'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';


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


export class SeeAllCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart : [],
            cashDel : false,
            stripe : false,
            totalCost : null,
            stripe : 'pk_test_51NafQaSI10A4W78jbaWvuwQgD86GLOryNrHPZxMdqejZ3Vxry7cZfmQz3sXSrFUTBsH5uOaAPvILhC9Amg49A0tl00iZwWGz8c',
            transform: '-100%',
            isInitialMount: true
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


    async componentDidMount(){

        try{

            const response = await axios.get(`/getmycartPrd/${localStorage.getItem('slno')}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                this.setState({
                    cart : response.data.cartPrd
                });

            }
            console.log(this.state.cart)

            this.startOpacityChange();
            
        }catch(err){
            console.log(err)
        }
    }

    handleQuantityChange = (product, newQuantity) => {
        const updatedCart = this.state.cart.map((each) => {
            if (each.slno === product.slno) {
                return { ...each, myamount: parseInt(newQuantity, 10) };
            }
            return each;
        });
    
        this.setState({ cart: updatedCart });
    };

    changeamount=async(e,amountNew,slno)=>{
        e.preventDefault();
        try{
            const response = await axios.get(`/changecartamount/${localStorage.getItem('slno')}/${slno}/${amountNew}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                this.componentDidMount()
            }
        }catch(err){
            console.log(err)
        }
    }

    removeit=async(e,slno)=>{
        e.preventDefault();
        try{
            const response = await axios.get(`/removecartitem/${localStorage.getItem('slno')}/${slno}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                this.componentDidMount()
            }
        }catch(err){
            console.log(err)
        }
    }
    
    showAllPrd=()=>{
        if(this.state.cart.length>0){
            return  this.state.cart.map((each)=>{
                return  <tr className='trdes'>
                <td scope="col"><div className='prdimgbox'><img className="fitimg" src={each.image}></img></div></td>
                <td scope="col">{each.name}</td>
                <td scope="col">{each.in_stock}</td>
                <td scope="col"><input type="number" value={each.myamount} min="0" max={each.in_stock} onChange={(e) => this.handleQuantityChange(each, e.target.value)}/></td>
                <td scope="col">{each.myamount*each.price}/=</td>
                <td scope="col"><button className="btn btn-sm btn-outline-info" type="button" onClick={(e)=>{this.changeamount(e,each.myamount,each.slno)}}>Update</button> &nbsp;<button className="btn btn-sm btn-outline-info" type="button" onClick={(e)=>{this.removeit(e,each.slno)}}>Remove</button></td>
                </tr> 
                    
                
            })
        }else{
            <p>No Product In Cart ... </p>
        }
    }

    calculateTotalAmount = () => {
        let total = 0;
        this.state.cart.forEach((each) => {
            total += each.price * each.myamount;
        });
        
        
        return total;
    };

    handleCheckboxChange1=async(e)=>{
      
        this.setState({
            cashDel : true,
            stripe : false
        })
   
    }

    handleCheckboxChange2=async(e)=>{
       
        this.setState({
            cashDel : false,
            stripe : true
        })
        
    }


    confircodmall= async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.get(`/confirmcodall/${localStorage.getItem('slno')}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                window.location.href = '/successPage'
            }
        }catch(err){
            console.log(err)
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
        const payNow= async token=>{
            const stripePromise = loadStripe('pk_test_51NafQaSI10A4W78jSqeSuIIcA2YOqe9VfMe8XbUdFOU7YfM4IlHj1e8mCJlsIEj63vaPpOU7jLtBYReEw52T69rm00ZyczvwiJ');
            try{
                const response = await axios({
                    url : `/mycardpay/${localStorage.getItem('slno')}`,
                    method : 'post',
                    data : {
                        amount : this.calculateTotalAmount(),
                        token,
                    }
                });
    
                if (response.data.requires_action) {
                    console.log('1')
                    const { client_secret,  payment_method} = response.data;
                    const stripe = await stripePromise;
                    
                    // Handle the customer action using Stripe.js
                    const result = await stripe.confirmCardPayment(client_secret, {
                        payment_method: payment_method.id,
                    });
    
                    if (result.error) {
                        
                        // Handle any error during customer action
                        console.error(result.error);
                    } else {
                        
                        // Payment completed successfully
                        try{

                            const ressuc = await axios({
                                url : `/mycardpayCon/${localStorage.getItem('slno')}`,
                                method : 'post',
                                data : {
                                    amount : result.paymentIntent.amount,
                                    token : result.paymentIntent.id,
                                }
                            });

                            if(ressuc.data.message == 'Success'){
                                window.location.href = '/successPage'
                            }

                        }catch(err){
                            console.log(err)
                        }

                        
                    }
                } else if (response.data.message === 'Success') {
                    
                    // Handle success without customer action
                    const ressuc = await axios({
                        url : `/mycardpayCon/${localStorage.getItem('slno')}`,
                        method : 'post',
                        data : {
                            amount : response.data.paymentIntent.amount,
                            token : response.data.paymentIntent.id,
                        }
                    });

                    if(ressuc.data.message == 'Success'){
                        window.location.href = '/successPage'
                    }

                    
                }
    
            }catch(err){
                console.log(err)
            }
        }


        return (
            <Fragment>
                <div id="slide" className='container-fluid d-flex justify-content-center cartdes' style={{ transform: `translateX(${transform})` }}>
                    <div className='row row-cols-1 row-cols-md-6 d-flex justify-content-center flex-col ovrflw'>
                        <div className='col col-md-12 mt-4 text-center ovrflw'>
                            <p className='fsz mb-5 alertshadw text-center headfont'>All Your Cart Products :</p>
                            <p className='fsz2 mb-5 alertshadw text-center headfont'>Your Profile Delivery Address And Phone Number Is Fixed For This Purchase. If You Change It After Confirming Checkout It Will Not Be Considered For This Purchase.</p>
                            {this.state.cart.length>0 ? <table className="tabledes table">
                            <thead className='headfont'>
                                <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Product</th>
                                <th scope="col">In Stock</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Price</th>
                                <th scope="col">Update or Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showAllPrd()}
                                                           
                                
                            </tbody>
                        </table> : <p className='fsz2 mb-5 alertshadw text-center bdfont'>No Product In Cart Yet .... Please Shop First.</p>}
                        {this.state.cart.length > 0 ? (
                            <p className='fsz2 mb-5 alertshadw text-center bdfont'>
                                Total Amount : {this.calculateTotalAmount()}/=
                            </p>
                        ) : null}

                        {this.state.cart.length>0 ? (<div className='fsz2 mb-5 alertshadw text-center bdfont'>
                            <p>Select Payment Option :</p>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                  
                                    onChange={(e)=>{this.handleCheckboxChange1(e)}}
                                />
                                Cash on Delivery
                            </label>&nbsp;&nbsp;&nbsp;
                            
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    
                                    onChange={(e)=>{this.handleCheckboxChange2(e)}}
                                />
                                Stripe
                            </label>
                        </div>) : null}
                        {this.state.cashDel == true ? <button className="btn btn-sm btn-outline-info mb-5 bdfont" type="button" onClick={(e)=>{this.confircodmall(e)}}><LocalMallIcon/> Confirm Checkout</button> : this.state.stripe== true ? <div className='mb-4'><StripeCheckout   stripeKey="pk_test_51NafQaSI10A4W78jSqeSuIIcA2YOqe9VfMe8XbUdFOU7YfM4IlHj1e8mCJlsIEj63vaPpOU7jLtBYReEw52T69rm00ZyczvwiJ"  label='Pay Now'  name='Pay With Credit Card'  billingAddress   amount={this.calculateTotalAmount()*100}   description={`Your Total Amount $${this.calculateTotalAmount()}`}  token={payNow} /></div> : null}

                        



                            


                        </div>

                    

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default SeeAllCart
