import React, { Component, Fragment } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

export class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resCondition : '',
            desc : '',
            rating : 0,
            transform: '-100%',
            isInitialMount: true
        }
    }
    
    async componentDidMount(){
        
        window.$('[data-bs-toggle="tooltip"]').tooltip();
        this.startOpacityChange();
        
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


    changeRating=( newRating, name )=>{
        this.setState({
          rating: newRating
        });
      } 

    
    resUserCond = ()=>{
        if(this.state.resCondition != ''){
            return <div className='text-center'>
                <p>{this.state.resCondition}</p>
            </div>
        }else{
            return <div className='text-center'>
                <p className='headfont'>Please Enter Your Thoughts About Our Service And Regulations .... Your Opinions Means A Lot For Us.</p>
            </div>
        }
        }

    sendReview= async(e)=>{
        const formData = new FormData();
        formData.append('review',this.state.desc);
        formData.append('rating',this.state.rating);
        try{
            const response = await axios.post('/sendReview', formData, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });

            if(response.data.message == 'Successfully Review Added ...'){
                this.setState({
                    desc : '',
                    rating : 0
                });
    
                const inputFields = document.getElementById('inpfld');
                
                inputFields.value = '';
                    
            }

            this.setState({
                resCondition : response.data.message
            });


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

        


    return (
        <Fragment>
            <div    id="slide" className='container-fluid reviewmain d-flex justify-content-center align-items-center flex-column' style={{ transform: `translateX(${transform})` }}>
            <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
            <div className='col col-md-12 mb-5 alertshadw'>{this.resUserCond()}</div>
        </div>
        <form method="POST"  encType='multipart/form-data'>
            <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                
                
                <div className='col col-md-10 mb-2'><textarea id='inpfld' onChange={(e)=>{this.setState({desc : e.target.value})}} className="form-control form-control-sm txtboxwidhigh frmshape" type="text" placeholder="Insert Review In 600 Characters." data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Review ." aria-label=".form-control-sm example"></textarea></div>
                <div className='col col-md-10 mb-2'><StarRatings
                rating={this.state.rating}
                starRatedColor="cyan"
                changeRating={this.changeRating}
                numberOfStars={6}
                name='rating'
                starDimension={starDimension}
                starSpacing={starSpacing}
                /></div>
                

                <div className='col col-md-10 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.sendReview(e)}} type="button" class="btn btn-sm btn-outline-info headfont"><AppRegistrationIcon /> Submit Review</button></div>
                </div>
        </form>
            </div>
        </Fragment>
    )
  }
}

export default ReviewPage
