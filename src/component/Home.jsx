
import React, { Component, Fragment } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import StarRatings from 'react-star-ratings';
import Pagination from 'react-js-pagination';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    
import Countdown from 'react-countdown';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events : [],
      timers: [],
      prdType : [],
      prdBrand : [],
      productData : [],
      serverReview : [],
      currentPage: 1,
      postsPerPage: 10
    }
  }
  
  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
    };

  async componentDidMount(){
    window.addEventListener('scroll',()=>{
      try{
        var topTimer = document.getElementById('timer').getBoundingClientRect().top;
        var bottomTimer = document.getElementById('timer').getBoundingClientRect().bottom;
        var topTimer2 = document.getElementById('prdtyp').getBoundingClientRect().top;
        var bottomTimer2 = document.getElementById('prdtyp').getBoundingClientRect().bottom;
        var topTimer3 = document.getElementById('prdbrand').getBoundingClientRect().top;
        var bottomTimer3 = document.getElementById('prdbrand').getBoundingClientRect().bottom;
        var topTimer4 = document.getElementById('prddata').getBoundingClientRect().top;
        var bottomTimer4 = document.getElementById('prddata').getBoundingClientRect().bottom;
        var topTimer5 = document.getElementById('prdrev').getBoundingClientRect().top;
        var bottomTimer5 = document.getElementById('prdrev').getBoundingClientRect().bottom;


      }catch(err){
        
      }
      
      
      if(topTimer<=window.innerHeight/2 && bottomTimer>=window.innerHeight/2){
        try{
          document.getElementById('timer').style.transform = 'translateX(0%)';
        }catch(err){
          
        }
        
      }else{
        try{
          document.getElementById('timer').style.transform = 'translateX(-100%)';
        }catch(err){
          
        }
        
      }


      
      
      if(topTimer2<=window.innerHeight/2 && bottomTimer2>=window.innerHeight/2){
        try{
          document.getElementById('prdtyp').style.transform = 'translateX(0%)';
        }catch(err){
          
        }
        
      }else{
        try{
          document.getElementById('prdtyp').style.transform = 'translateX(100%)';
        }catch(err){
          
        }
        
      }


      
      
      if(topTimer3<=window.innerHeight/2 && bottomTimer3>=window.innerHeight/2){
        try{
          document.getElementById('prdbrand').style.transform = 'translateX(0%)';
        }catch(err){
          
        }
        
      }else{
        try{
          document.getElementById('prdbrand').style.transform = 'translateX(-100%)';
        }catch(err){
         
        }
        
      }




      
      
      if(topTimer4<=window.innerHeight/2 && bottomTimer4>=window.innerHeight/2){
        try{
          document.getElementById('prddata').style.opacity = '1';
        }catch(err){
      
        }
        
      }else{
        try{
          document.getElementById('prddata').style.opacity = '0';
        }catch(err){
         
        }
        
      }



      
      
      if(topTimer5<=window.innerHeight/2 && bottomTimer5>=window.innerHeight/2){
        try{
          document.getElementById('prdrev').style.opacity = '1';
        }catch(err){
        
        }
        
      }else{
        try{
          document.getElementById('prdrev').style.opacity = '0';
        }catch(err){
        
        }
        
      }

    });
    

    try{
      const res1 = await axios.get(`/eventDats`,{
        headers : {
          'Content-Type' : 'application/json'
        }
      });
      const res2 = await axios.get(`/getPrdTyp`,{
        headers : {
          'Content-Type' : 'application/json'
        }
      });
      const res3 = await axios.get(`/getPrdBrnd`,{
        headers : {
          'Content-Type' : 'application/json'
        }
      });

      const res4 = await axios.get(`/getHomePrd`,{
        headers : {
          'Content-Type' : 'application/json'
        }
      });

      const res5 = await axios.get('/getwebreview',{
        headers : {
          'Content-Type' : 'application/json'
        }
      });

      const [response1, response2, response3, response4, response5] = await Promise.all([res1, res2, res3, res4, res5]);

      if(response1.data.message == 'Successful'){
        this.setState({
          events : response1.data.eventData
        });
      }
      if(response2.data.message == 'Successful'){
        this.setState({
          prdType : response2.data.allType
        });
      }
      if(response3.data.message == 'Successful'){
        this.setState({
          prdBrand : response3.data.allBrand
        });
      }

      if(response4.data.message == 'Successful'){
        
        this.setState({
          productData : response4.data.allPrd
        });
      }

      if(response5.data.message == 'Successful'){
        
        this.setState({
          serverReview : response5.data.allReview
        });
      }
      
    }catch(error){
      console.log(error);
    }
  }

  

  generateEventData = ()=>{
    let act = 1;
    return  this.state.events.map((eachev,index)=>{
      if(index == 0){
        return    <div className="carousel-item active" data-bs-interval="4000">
      <img src={eachev.event_image} className="d-block w-100 objft" alt="..." />
      <div className="carousel-caption d-block d-md-block">
        <h5 className='carshead carseltext headfont'>{eachev.event}</h5>
        <p className="carseltext bdfont">{eachev.event_details} ...Till {eachev.event_end.split('T',1)}</p>
        <button type="button" className="btn btn-sm btn-info bdfont"><Link to={'/viewserverProductEvents/'+eachev.slno} className="btn-primary evbtn">Shop Now</Link></button>
      </div>
    </div>
      }else{
        return    <div className="carousel-item" data-bs-interval="3000">
      <img src={eachev.event_image} className="d-block w-100 objft" alt="..." />
      <div className="carousel-caption d-block d-md-block">
        <h5 className='carshead carseltext headfont'>{eachev.event}</h5>
        <p className='carseltext bdfont'>{eachev.event_details} ...Till {eachev.event_end.split('T',1)}</p>
        <button type="button" className="btn btn-sm btn-info bdfont"><Link to={'/viewserverProductEvents/'+eachev.slno} className="btn-primary evbtn">Shop Now</Link></button>
      </div>
    </div>
      }
      
    })
  }


  showTimerData = ()=>{
    return  this.state.events.map((perProd)=>{
        return   <div className='col mb-5 mincardbd' key={perProd.slno}>
        <div className="card cardanim">
       
        
        
        <div className="card-body bordcardbd2 d-flex justify-content-center flex-column">
          <p className="card-title d-flex justify-content-center flex-column"><span className='boldcardtxt text-center headfont'>{perProd.event}</span></p>
          <p className="card-title d-flex justify-content-center flex-column"><span className='boldcardtxt text-center bdfont'><Countdown date={perProd.event_end} /></span></p>
        
        </div>
        </div>
        </div>
    })
}

showPrdTypeData = ()=>{
  return  this.state.prdType.map((perProd)=>{
    return   <div className='col mb-5 mincardbd'  key={perProd.slno}>
    <div className="card cardanim">
   
    <img src={perProd.image} class="card-img cardImg2" alt="..."></img>
    
    <div className="card-img-overlay bordcardbd3 d-flex justify-content-center flex-column">
    <Link to={'/viewserverProductType/'+perProd.slno} className="btn-primary"><p className="card-title d-flex justify-content-center flex-column txtshad2"><span className='boldcardtxt text-center bdfont'>{perProd.type}</span></p></Link>

    
    </div>
    </div>
    </div>
})
}

showPrdBrandData = ()=>{
  return  this.state.prdBrand.map((perProd)=>{
    return   <div className='col mb-5 mincardbd'  key={perProd.slno}>
    <div className="card cardanim">
   
    <img src={perProd.image} class="card-img cardImg2" alt="..."></img>
    
    <div className="card-img-overlay bordcardbd3 d-flex justify-content-center flex-column">
    <Link to={'/viewserverProductBrand/'+perProd.slno} className="btn-primary"><p className="card-title d-flex justify-content-center flex-column txtshad2"><span className='boldcardtxt text-center bdfont'>{perProd.type}</span></p></Link>

    
    </div>
    </div>
    </div>
})
}

showReviewData = ()=>{
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


  return  this.state.serverReview.map((perEvent)=>{

      return   <div className="card mb-3 cardrev cardbgdisp homereview">
      <div className="row row-cols-1 row-cols-md-6 g-0">
        <div className="col mt-3 mt-md-0 mx-auto col-md-1 d-flex justify-content-center align-items-center picsiz">
          <img src={perEvent.image} className="img-fluid cardImg" alt="..." />
        </div>
        <div className="col col-md-11">
          <div className="card-body">
            <h5 className="card-title headfont">{perEvent.usermail}</h5>
            <p className="card-text fntsizerev homerevbox bdfont">{perEvent.comment}</p>
            <p className="card-text"><StarRatings
        rating={perEvent.rating}
        starRatedColor="cyan"
        numberOfStars={6}
        name='rating'
        starDimension={starDimension}
        starSpacing={starSpacing}
      /></p>
          </div>
        </div>
      </div>
    </div>
  })
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


  return  totalPosts.map((perEmp)=>{
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
        <p className="card-title"><CommentIcon /><span className='boldcardtxt fsize headfontres'> {perEmp.name}</span></p>
        <p className="card-text txtsize bdfontres"><span className='boldcardtxt'>Type :</span> {perEmp.type}<br></br><span className='boldcardtxt'>Brand :</span> {perEmp.brand}<div className="description-container"><span className='boldcardtxt'>Description :<br></br></span> {this.padDescription(perEmp.description)}</div><span className='boldcardtxt'>In Stock :</span> {perEmp.amount_left} <br></br><span className='boldcardtxt'>Price :</span> {perEmp.price}/= <br></br><span className='boldcardtxt'>Seller :</span> {perEmp.seller}<br></br><StarRatings
        rating={perEmp.rating}
        starRatedColor="cyan"
        numberOfStars={6}
        name='rating'
        starDimension={starDimension}
        starSpacing={starSpacing}
      /></p>
        <Link to={'/viewserverProduct/'+perEmp.slno} className="desbtn btn-primary bdfontres"><SettingsIcon fontSize='small' /> View More</Link> 
      </div>
      </div>
      </div>
  })
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
};


  render() {

    const { productData, currentPage, postsPerPage } = this.state;
    const totalPosts = productData.length;

    return (
        <Fragment>
            <div className='container-fluid mainhome d-flex justify-content-center'>


              <div className='carselevent'>
              <div id="carouselExampleCaptions" className="carousel slide carsbord" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                
                {this.generateEventData()}
                
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
              </div>
              
            </div>




            
            <div id='timer' className='container-fluid timerhight d-flex justify-content-center flex-column topborder p-5'>
            {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 mt-5 justify-content-center'>

            {this.showTimerData()}
        
        
            </div> : 
            <div className='row row-cols-1 row-cols-md-4 mt-5 justify-content-center'>


            {this.showTimerData()}

        
            </div>}
            </div>





            <div id='prdtyp' className='container-fluid prdtypebox d-flex justify-content-center flex-column pt-5'>
              <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mt-3 mb-0 p-0 align-items-center'>
                <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center align-items-center homeptsz headfont'>All Products Type :</div>
              </div>

              <div className='container-fluid prdtyphight pt-3 d-flex flex-column'>
            {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 justify-content-center'>

            {this.showPrdTypeData()}
        
        
            </div> : 
            <div className='row row-cols-1 row-cols-md-4 justify-content-center'>


            {this.showPrdTypeData()}

        
            </div>}
            </div>
              
            
              
            </div>





            <div id='prdbrand' className='container-fluid prdtypebox d-flex justify-content-center flex-column  pt-5'>
              <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mt-3 mb-0 p-0 align-items-center'>
                <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center align-items-center homeptsz headfont'>All Products Brand :</div>
              </div>

              <div className='container-fluid prdtyphight pt-3 d-flex flex-column'>
            {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 justify-content-center'>

            {this.showPrdBrandData()}
        
        
            </div> : 
            <div className='row row-cols-1 row-cols-md-4 justify-content-center'>


            {this.showPrdBrandData()}

        
            </div>}
            </div>
              
              
            </div>




           
        <div id='prddata' className='container-fluid editEmp2 d-flex flex-column p-5'>
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
            <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center homeptsz headfont'>All Products List :</div>
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




        <div id='prdrev' className='container-fluid editEmp2 d-flex flex-column p-5'>
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
            <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center homeptsz headfont'>Latest Reviews :</div>
        </div>
        {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-2 mt-5 justify-content-center'>

            {this.showReviewData()}
      
        </div> : 
        <div className='row row-cols-1 row-cols-md-2 mt-5 justify-content-center'>


            {this.showReviewData()}

        
        </div>}

        </div>

        

        </Fragment>
    )
  }
}

export default Home
