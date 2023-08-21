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


export class HandleReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports : [],
            currentPage: 1,
            postsPerPage: 7
        }
    }

    removereport=async(e, serial)=>{
        try{
            const response = await axios.get(`/deletereport/${localStorage.getItem('slno')}/${serial}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                window.location.reload();
            }
        }catch(err){
            console.log(err)
        }
    }

    async componentDidMount(){
        try{
            const response = await axios.get(`/getallreports/${localStorage.getItem('slno')}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message = 'Success'){
                this.setState({
                    reports : response.data.reports
                })
            }
        }catch(err){
            console.log(err)
        }
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
        }
    

        showAllReports=()=>{
            if(this.state.reports.length>0){
                
                const { reports, currentPage, postsPerPage } = this.state;
                const indexOfLastPost = currentPage * postsPerPage;
                const indexOfFirstPost = indexOfLastPost - postsPerPage;
                const totalOrders = reports.slice(indexOfFirstPost, indexOfLastPost);
    
                return  totalOrders.map((each)=>{
                    return  <tr className='trdes'>
                    <td scope="col"><div className='prdimgbox'><img className="fitimg" src={each.image}></img></div></td>
                    <td scope="col">{each.name}</td>
                    <td scope="col">{each.serial}</td>
                    <td scope="col">{each.usermail}</td>
                    
                    <td scope="col">{each.sellermail}</td>
                    <td scope="col">{each.selleraddress}</td>
                    <td scope="col">{each.sellercontact}</td>
                    
                    <td scope="col">{each.price}/=</td>
                    
                    <td scope="col"><button className="btn btn-sm btn-outline-info" type="button" onClick={(e)=>{this.removereport(e,each.slno)}}>Remove</button></td>
                    </tr> 
                        
                    
                })
            }else{
                <p>No Orders In Orders List ... </p>
            }
        }

  render() {
    const { reports, currentPage, postsPerPage } = this.state;
    const totalPosts = reports.length;

    return (
        <Fragment>
            <div className='container-fluid d-flex justify-content-center cartdes'>
        <div className='row row-cols-1 row-cols-md-6 d-flex justify-content-center flex-col ovrflw'>
            <div className='col col-md-12 mt-4 text-center ovrflw d-flex flex-column justify-content-center'>
                <h4 className='fsz mb-5 alertshadw text-center headfont'>All User Reports :</h4>
                <p className='fsz2 mb-5 alertshadw text-center headfont'><h4>Contact The Seller And Figure Out The Issue .....</h4></p>
                {this.state.reports.length>0 ? <div className='d-flex flex-column justify-content-center'><table className="tabledes table mb-4">
                <thead className='headfont'>
                    <tr>
                    <th scope="col">Prd. Image</th>
                    <th scope="col">Prd. Name</th>
                    <th scope="col">Prd. Serial</th>
                    <th scope="col">Customer Mail</th>
                    <th scope="col">Seller Mail</th>
                    <th scope="col">Seller Address</th>
                    <th scope="col">Seller Contact</th>
                    <th scope="col">Price</th>
                    <th scope="col">Remove Report</th>
                    </tr>
                </thead>
                <tbody>
                    {this.showAllReports()}
                                               
                    
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
            </div></div>: <p className='fsz2 mb-5 alertshadw text-center headfont'>No Reports List Yet .... </p>}
            


            </div>

        

        </div>
        </div>
        </Fragment>
    )
  }
}

export default HandleReports
