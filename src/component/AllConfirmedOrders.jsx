import React, { Component, Fragment } from 'react'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import StripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';
import Pagination from 'react-js-pagination';


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




export class AllConfirmedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            currentPage: 1,
            postsPerPage: 7,
            transform: '-100%',
            isInitialMount: true
        }
    }
    

    async componentDidMount(){
        try{
            const response = await axios.get(`/getmyshipments/${localStorage.getItem('slno')}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message = 'Success'){
                this.setState({
                    orders : response.data.order
                })
            }

            this.startOpacityChange();
        }catch(err){
            console.log(err)
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

      async componentDidUpdate(prevProps){
        if (prevProps.componentId !== this.props.componentId && !this.state.isInitialMount) {
            this.startOpacityChange();
          }
  
        if (this.state.isInitialMount) {
              
              this.setState({ isInitialMount: false });
            }
      }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
        }

    showAllPrd=()=>{
        if(this.state.orders.length>0){
            
            const { orders, currentPage, postsPerPage } = this.state;
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const totalOrders = orders.slice(indexOfFirstPost, indexOfLastPost);

            return  totalOrders.map((each)=>{
                return  <tr className='trdes'>
                <td scope="col"><div className='prdimgbox'><img className="fitimg" src={each.image}></img></div></td>
                <td scope="col">{each.name}</td>
                
                <td scope="col">{each.delivery_address}</td>
                
                <td scope="col">{each.payment_option}</td>
                <td scope="col">{each.estimeted_delivery.split('T',1)}</td>
                <td scope="col">{each.amount}</td>
                <td scope="col">{each.price}</td>
                <td scope="col">{each.delivery_status}</td>
                <td scope="col"><Link className='txtdc' to={'/checkDelivery/'+each.slno}><button className="btn btn-sm btn-outline-info" type="button">Details</button></Link></td>
                </tr> 
                    
                
            })
        }else{
            <p className='bdfont'>No Orders In Orders List ... </p>
        }
    }


    render() {
        const { transform } = this.state;
        const { orders, currentPage, postsPerPage } = this.state;
        const totalPosts = orders.length;

        return (
            <Fragment>
            <div id="slide" className='container-fluid d-flex justify-content-center cartdes' style={{ transform: `translateX(${transform})` }}>
            <div className='row row-cols-1 row-cols-md-6 d-flex justify-content-center flex-col ovrflw'>
                <div className='col col-md-12 mt-4 text-center ovrflw d-flex flex-column justify-content-center'>
                    <p className='fsz mb-5 alertshadw text-center headfont'>All My Confirmed Orders :</p>

                    {this.state.orders.length>0 ? <div className='d-flex flex-column justify-content-center'><table className="tabledes table mb-4">
                    <thead className='bdfont'>
                        <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Product</th>
                        
                        <th scope="col">Customer Address</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Delivery Expected</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Price</th>
                        <th scope="col">Delivery Status</th>
                        <th scope="col">Delivery Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showAllPrd()}
                                                   
                        
                    </tbody>
                </table> <div className='row row-cols-1 mx-auto mb-5 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={postsPerPage}
                totalItemsCount={totalPosts}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link mx-auto"
                innerClass="pagination mx-auto text-center"
                />
                </div></div>: <p className='fsz2 mb-5 alertshadw text-center'>No Order In Order List Yet .... </p>}
                
    
    
                </div>
    
            
    
            </div>
            </div>
            </Fragment>
        )
    }

}

export default AllConfirmedOrders
