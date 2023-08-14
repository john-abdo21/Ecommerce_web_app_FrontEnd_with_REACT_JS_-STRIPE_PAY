import axios from 'axios';
import React, { Component, Fragment } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import StarRatings from 'react-star-ratings';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Pagination from 'react-js-pagination';
import SettingsIcon from '@mui/icons-material/Settings';
import CommentIcon from '@mui/icons-material/Comment';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

export class EventProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role : '',
            product : [],
            currentPage: 1,
            postsPerPage: 14,
            productData : [],
            comments : [],
            serverReview : []
        }
    }
    
    async componentDidMount(){
        const {sln} = this.props.match.params;

        try{
            const res = await axios.get(`/getuserRole/${localStorage.getItem('token')}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            

            const res2 = await axios.get(`/geteventaddingProd/${sln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            
            const res3 = await axios.get(`/getsameeventtypePrd/${sln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            const res4 = await axios.get(`/geteventprdusercoms/${sln}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            

            if(res.data.message == 'Success'){
                this.setState({
                    role : res.data.role
                })
                
            }

            if(res2.data.message == 'Success'){
                this.setState({
                    product : res2.data.prdData[0]
                });
                console.log(this.state.product)
            }

            if(res3.data.message == 'Success'){
                this.setState({
                    productData : res3.data.allPrd
                });
                
            }

            if(res4.data.message == 'Success'){
                this.setState({
                    comments : res4.data.usercom
                })
                console.log(this.state.comments)
            }

        }catch(error){
            console.log(error)
        }
    }

    async componentDidUpdate(prevProps){
        const {sln} = this.props.match.params;
        if(prevProps.match.params.sln !== sln){
            try{
                const res = await axios.get(`/getuserRole/${localStorage.getItem('token')}`,{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
                
    
                const res2 = await axios.get(`/geteventaddingProd/${sln}`,{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
                
                const res3 = await axios.get(`/getsameeventtypePrd/${sln}`,{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });

                const res4 = await axios.get(`/geteventprdusercoms/${sln}`,{
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                });
    
                
    
                if(res.data.message == 'Success'){
                    this.setState({
                        role : res.data.role
                    })
                    
                }
    
                if(res2.data.message == 'Success'){
                    this.setState({
                        product : res2.data.prdData[0]
                    });
                    console.log(this.state.product)
                }
    
                if(res3.data.message == 'Success'){
                    this.setState({
                        productData : res3.data.allPrd
                    });
                    
                }

                if(res4.data.message == 'Success'){
                    this.setState({
                        comments : res4.data.usercom
                    })
                }
    
            }catch(error){
                console.log(error)
            }
        }
    }


    showReviewData = ()=>{
        
      
        if(this.state.comments.length>0){
        return  this.state.comments.map((perEvent)=>{
      
            return   <div className="card mb-3 cardrev cardbgdisp homereview">
            <div className="row row-cols-1 row-cols-md-6 g-0">
              <div className="col mt-3 mt-md-0 mx-auto col-md-1 d-flex justify-content-center align-items-center picsiz">
                <img src={perEvent.userimg} className="img-fluid cardImg" alt="..." />
              </div>
              <div className="col col-md-11">
                <div className="card-body">
                  <h5 className="card-title">{perEvent.email}</h5>
                  <p className="card-text fntsizerev homerevbox">{perEvent.comment}</p>
                  
                </div>
              </div>
            </div>
          </div>
        })
        }else{
            return  <div><p className='alertshadw text-center'>No Product Review For This Product Yet.</p></div>
        }
      }
      

    showProductData = ()=>{
        const windowWidth = window.innerWidth;
      
        let starDimension;
      
        if (windowWidth >= 1024) {
        starDimension = '1.2vw'; // Greater than or equal to 1024, set to 1.2vw
        } else if (windowWidth >= 768) {
        starDimension = '2vw'; // Between 768 and 1023, set to 2vw
        } else {
        starDimension = '4vw'; // Smaller than 768, set to 4vw
        }
        const starSpacing = window.innerWidth > 768 ? '0.12rem' : '0.08rem';
      
      
        const { productData, currentPage, postsPerPage } = this.state;
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const totalPosts = productData.slice(indexOfFirstPost, indexOfLastPost);
      
      
        if(this.state.productData.length>0){ return totalPosts.map((perEmp)=>{
            return   <div className='col mb-5 mincardbd' key={perEmp.slno}>
            <div className="card cardanim bordandanim">
           
      
      
            <div id={'carouselExampleControls-'+perEmp.slno} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-innerval">
                <div className="carousel-item active">
                <img src={perEmp.image1} className="d-block w-100 cardImg" alt="..." />
                </div>
                <div class="carousel-item">
                <img src={perEmp.image2} className="d-block w-100 cardImg" alt="..." />
                </div>
                <div class="carousel-item">
                <img src={perEmp.image3} className="d-block w-100 cardImg" alt="..." />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={'#carouselExampleControls-'+perEmp.slno} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={'#carouselExampleControls-'+perEmp.slno} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
      
      
            
            <div className="card-body">
              <p className="card-title"><CommentIcon /><span className='boldcardtxt fsize'> {perEmp.name}</span></p>
              <p className="card-text txtsize"><span className='boldcardtxt'>Type :</span> {perEmp.type}<br></br><span className='boldcardtxt'>Brand :</span> {perEmp.brand}<div className="description-container"><span className='boldcardtxt'>Description :<br></br></span> {this.padDescription(perEmp.description)}</div><span className='boldcardtxt'>In Stock :</span> {perEmp.amount_left} <br></br><span className='boldcardtxt'>Price :</span> {perEmp.price}/= <br></br><span className='boldcardtxt'>Seller :</span> {perEmp.seller}<StarRatings
              rating={perEmp.rating}
              starRatedColor="cyan"
              numberOfStars={6}
              name='rating'
              starDimension={starDimension}
              starSpacing={starSpacing}
            /></p>
              <Link to={'/viewserverProduct/'+perEmp.slno} className="desbtn btn-primary"><SettingsIcon fontSize='small' /> View More</Link> 
            </div>
            </div>
            </div>
        })}else{
            return  <div><p className='alertshadw mb-4 text-center'>No Products To Show ...</p></div>
        }
        }

    padDescription = (description) => {
        const minLength = 600;
        const currentLength = description.length;
        const remainingChars = minLength - currentLength;
      
        if (remainingChars > 0) {
          // Add empty spaces to the description
          const emptySpaces = ' '.repeat(remainingChars);
          return description + emptySpaces;
        }
      
        return  description;
      }

    render() {
        const windowWidth = window.innerWidth;

        let starDimension;
      
        if (windowWidth >= 1024) {
        starDimension = '1.2vw'; // Greater than or equal to 1024, set to 1.2vw
        } else if (windowWidth >= 768) {
        starDimension = '2vw'; // Between 768 and 1023, set to 2vw
        } else {
        starDimension = '4vw'; // Smaller than 768, set to 4vw
        }
        const starSpacing = window.innerWidth > 768 ? '0.12rem' : '0.08rem';

        const { productData, currentPage, postsPerPage } = this.state;
        const totalPosts = productData.length;

        return (
            <Fragment>
                <div  className='container-fluid mainfrontprd d-flex justify-content-center'>
                    <div  className='row row-cols-1 row-cols-md-6 d-flex flex-column'>
                        <div className='col col-md-12'>
                            <div id="carouselExample" className="carousel slide mt-5 boxdes" data-bs-ride="carousel">
                            <div className="carousel-inner cart">
                            <div className="carousel-item cart active">
                                <img src={this.state.product.image1} className="d-block w-100 imgfill" alt="..." />
                            </div>
                            <div className="carousel-item cart">
                                <img src={this.state.product.image2} className="d-block w-100 imgfill" alt="..." />
                            </div>
                            <div className="carousel-item cart">
                                <img src={this.state.product.image3} className="d-block w-100 imgfill" alt="..." />
                            </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                            </button>
                            </div>
                        </div>
                        <div className='col col-md-12 mt-5 mb-3'>
                            <p className='cartaddfont glowef p-1 pwidth ptransfrm'><b>Product Name :</b> &nbsp;{this.state.product.name}<br></br><b>Seller :</b> &nbsp;{this.state.product.sellerName}<br></br><br></br><b>Product Description :</b> &nbsp;{this.state.product.description}<br></br><br></br><b>Type :</b> &nbsp;{this.state.product.type}<br></br><b>Brand :</b> &nbsp;{this.state.product.brand}<br></br><b>In Stock :</b> &nbsp;{this.state.product.amount_left}<br></br><b>Price :</b> &nbsp;{this.state.product.price}/=<br></br><br></br><VisibilityIcon /> <b>Total Views :</b> &nbsp;{this.state.product.total_view}<br></br><ThumbUpIcon /> <b>Liked :</b> &nbsp;{this.state.product.like_amount}<br></br><ThumbDownAltIcon /> <b>Disliked :</b> &nbsp;{this.state.product.dislike_amount}<br></br><br></br><b>Rating : </b> &nbsp;<StarRatings
                                rating={this.state.product.rating}
                                starRatedColor="cyan"
                                numberOfStars={6}
                                name='rating'
                                starDimension={starDimension}
                                starSpacing={starSpacing}
                            /></p>
                            
                        </div>

                        <div className='col col-md-12 mt-1 d-flex justify-content-center mb-5'>
                            {this.state.role == ''? <button type="button" className="btn btn-sm btn-outline-info disabled"><AddShoppingCartIcon /> Log In To Buy</button> : this.state.role == 'Seller' ? <button type="button" className="btn btn-sm btn-outline-info disabled"><AddShoppingCartIcon /> Only Buyers Can Buy</button> : this.state.role == 'Employee' ? <button type="button" className="btn btn-sm btn-outline-info disabled"><AddShoppingCartIcon /> Only Buyers Can Buy</button> : this.state.role == 'User' && this.state.product.amount_left>0 ? <button type="button" className="btn btn-sm btn-outline-info"><AddShoppingCartIcon /> Add To Cart</button> : null}
                        </div>
                    </div>


                </div>




                <div className='container-fluid editEmp2 d-flex flex-column p-5'>
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
            <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center homeptsz text-center'>Reviews From Users Who Bought It :</div>
        </div>
        {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-2 mt-5 justify-content-center'>

            {this.showReviewData()}
      
        </div> : 
        <div className='row row-cols-1 row-cols-md-2 mt-5 justify-content-center'>


            {this.showReviewData()}

        
        </div>}

        </div>





                <div className='container-fluid editEmp2 d-flex flex-column p-5'>
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
            <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center homeptsz'>Products You May Like :</div>
        </div>
        {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 mt-5 justify-content-center'>

            {this.showProductData()}
      
        </div> : 
        <div className='row row-cols-1 row-cols-md-4 mt-5 justify-content-center'>


            {this.showProductData()}

        
        </div>}
        <div className='row row-cols-1 mx-auto row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
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
        </div>

        </div>

            </Fragment>
        )
    }
}

export default EventProductAdd
