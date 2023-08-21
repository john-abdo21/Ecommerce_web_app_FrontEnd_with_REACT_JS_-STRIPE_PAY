import React, { Component,Fragment } from 'react'

import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import StarRatings from 'react-star-ratings';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    


export class MyEventProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            productData : [],
            delSuc : '',
            transform: '-100%',
            isInitialMount: true
        }
    }
    
    async componentDidMount(){
        window.$('[data-bs-toggle="tooltip"]').tooltip();
        try{

            const response = await axios.get(`/eventProductsData/${localStorage.getItem('slno')}`, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Successful'){
                this.setState({
                    productData : response.data.productData
                })
            }

            this.startOpacityChange();

        }catch(error){
            console.log(error)
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
        return  this.state.productData.map((perEmp)=>{
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
              <p className="card-text txtsize bdfontres"><span className='boldcardtxt'>Type :</span> {perEmp.type}<br></br><span className='boldcardtxt'>Brand :</span> {perEmp.brand}<div className="description-container"><span className='boldcardtxt'>Description :<br></br></span> {this.padDescription(perEmp.description)}</div><span className='boldcardtxt'>In Stock :</span> {perEmp.amount_left} <br></br><span className='boldcardtxt'>Price :</span> {perEmp.price}/= <br></br><StarRatings
              rating={perEmp.rating}
              starRatedColor="cyan"
              numberOfStars={6}
              name='rating'
              starDimension={starDimension}
              starSpacing={starSpacing}
            /></p>
              <Link to={'/changeEventProduct/'+perEmp.slno} class="desbtn btn-primary bdfontres"><SettingsIcon fontSize='small' /> Edit</Link> 
            </div>
            </div>
            </div>
        })
    }

    

  render() {
    const { transform } = this.state;
    return (
        <Fragment>
        <div id="slide" className='container-fluid editEmp d-flex flex-column p-5'  style={{ transform: `translateX(${transform})` }}>
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
            <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center headfont'><h3>All Products List :</h3></div>
        </div>
        {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 mt-5 justify-content-center'>

        {this.showProductData()}
    
    
    </div> : 
    <div className='row row-cols-1 row-cols-md-4 mt-5 justify-content-center'>


        {this.showProductData()}

    
    </div>}
        

    </div>
        </Fragment>
    )
  }
}

export default MyEventProduct
