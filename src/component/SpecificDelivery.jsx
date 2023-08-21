import React, { Component, Fragment } from 'react'
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ArchiveIcon from '@mui/icons-material/Archive';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LinearScaleOutlinedIcon from '@mui/icons-material/LinearScaleOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarRatings from 'react-star-ratings';
import SweetAlert2 from 'react-sweetalert2';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PaymentIcon from '@mui/icons-material/Payment';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import axios from 'axios';

export class SpecificDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onprocess : false,
            packaged : false,
            fordelivery: false,
            delivered : false,
            uuid : '',
            name : '',
            exptDel : '',
            allstates : [],
            rating : 0,
            comment : '',
            like : false,
            dislike : false,
            swal: {},
            swal2: {},
            reviewDone : '',
            reportDone : '',
            withinTime: false,
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
        const {slno} = this.props.match.params;
        try{
            const response = await axios({
                url : `/getStatusPrdOrd/${localStorage.getItem('slno')}`,
                method : 'post',
                data : {
                    postSL : slno,
                }
            });

            const response2 = await axios({
                url: `/getdeliveryStatus/${localStorage.getItem('slno')}`,
                method : 'post',
                data : {
                    serial : slno,
                }
            });

            const response3 = await axios({
                url: `/getreviewStatus/${localStorage.getItem('slno')}`,
                method : 'post',
                data : {
                    serial : slno,
                }
            });

            const response4 = await axios({
                url: `/getreportStatus/${localStorage.getItem('slno')}`,
                method : 'post',
                data : {
                    serial : slno,
                }
            });

            const response5 = await axios({
                url: `/getwithintimeStatus/${localStorage.getItem('slno')}`,
                method : 'post',
                data : {
                    serial : slno,
                }
            });




            if (response.data.message == 'Success'){
                this.setState({
                    onprocess : response.data.onprocess,
                    packaged : response.data.packaged,
                    fordelivery : response.data.fordelivery,
                    delivered : response.data.delivered,
                    uuid : response.data.uuid,
                    name : response.data.name,
                    exptDel : response.data.delDate
                })
                
            }

            if(response2.data.message == 'Success'){
                this.setState({
                    allstates : response2.data.statesall
                })
                console.log(this.state.allstates)
            }

            if(response3.data.message == 'Success'){
                this.setState({
                    reviewDone : response3.data.done
                })
            }

            if(response4.data.message == 'Success'){
                this.setState({
                    reportDone : response4.data.done
                })
            }


            if(response5.data.message == 'Success'){
                this.setState({
                    withinTime  : response5.data.done
                })
            }
            

            this.startOpacityChange();

        }catch(err){
            console.log(err)
        }
    }

    showDeliveryStat = ()=>{
        if(this.state.allstates.length > 0){
            return  this.state.allstates.map((per)=>{
                if(per.changedValue == 'Packaged'){
                    const formattedTime = new Date(per.time).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZoneName: 'short'
                      });

                    return  <div className='col col-md-12'><p className='mx-auto p-2 bdfontres'>{formattedTime}&nbsp; &gt;&gt; &nbsp;&nbsp;&nbsp;&nbsp;The product has been packaged by seller and on our warehouse.</p><hr/></div>
                
                }else if(per.changedValue == 'For Delivery'){
                    const formattedTime = new Date(per.time).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZoneName: 'short'
                      });

                    return  <div className='col col-md-12'><p className='mx-auto p-2 bdfontres'>{formattedTime}&nbsp; &gt;&gt; &nbsp;&nbsp;&nbsp;&nbsp;The product is out for delivery, you may receive it today or tomorrow. Kindly, when you are contacted receive your phone call.</p><hr/></div>
                }else if(per.changedValue == 'Delivered'){
                    const formattedTime = new Date(per.time).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZoneName: 'short'
                      });

                    return  <div className='col col-md-12'><p className='mx-auto p-2 bdfontres'>{formattedTime}&nbsp; &gt;&gt; &nbsp;&nbsp;&nbsp;&nbsp;The product has been delivered, kindly review it so that other customer can have idea about it.</p><hr/></div>
                }
            })
        }else{
            return  <div className='col col-md-12'><p className='text-center p-2 bdfontres'>The product has been successfully added to processing.</p></div>
        }
    }

    changeRating=( newRating, name )=>{
        this.setState({
          rating: newRating
        });
      } 

      makelike=()=>{
        this.setState({
            like : true,
            dislike : false
        })
      }

      makedislike = ()=>{
        this.setState({
            like: false,
            dislike : true
        })
      }

      getreview = async(e)=>{
        const {slno} = this.props.match.params;
        try{
            const response = await axios({
                url : `/getreviewfinal/${localStorage.getItem('slno')}`,
                method : 'post',
                data : {
                    review : this.state.comment,
                    like : this.state.like,
                    dislike : this.state.dislike,
                    rating : this.state.rating,
                    delivNo : slno
                }
            });
            if(response.data.message == 'Success'){
                this.setState({
                    swal: {
                        show: true,
                        title: 'Your Review Was Successfully Submitted.',
                        text: 'Thanks For Your Continuous Support. Thanks, For Chosing Us For Your Daily Life ...'
                    }
                });

                this.setState({
                    rating : 0,
                    comment : '',
                    like : false,
                    dislike : false
                })

                document.getElementById('txtbox').value = '';

            }
        }catch(err){
            console.log(err)
        }
      }


      getreport = async(e)=>{
        const {slno} = this.props.match.params;
        try{
            const response = await axios({
                url : `/getreportfinal/${localStorage.getItem('slno')}`,
                method : 'post',
                data : {
                    delivNo : slno
                }
            });

            if(response.data.message == 'Success'){
                this.setState({
                    swal2: {
                        show: true,
                        title: 'Your Report Was Successfully Submitted.',
                        text: 'Thanks For Your Continuous Support. Thanks, For Chosing Us For Your Daily Life ...'
                    }
                });


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
                <div id="slide" className='container-fluid specificord d-flex flex-column alertshadw'  style={{ transform: `translateX(${transform})` }}>
                    <div className='row row-cols-1 row-cols-md-7 mt-4'>
                        <div className='col col-md-12 d-flex flex-column mt-4'>
                            <div className='mx-auto'>
                            <p className='text-md-start'><PaymentIcon /> &nbsp; <span className='headings headfont'>Order UUID :</span> &nbsp;<span className='smollsize bdfontres'>{this.state.uuid}</span></p>
                            <p className='text-md-start'><BadgeIcon /> &nbsp; <span className='headings headfont'>Order Name :</span> &nbsp;<span className='smollsize bdfontres'>{this.state.name}</span></p>
                            <p className='text-md-start'><CalendarMonthIcon /> &nbsp; <span className='headings headfont'>Expected Delivery :</span> &nbsp;<span className='smollsize bdfontres'>{this.state.exptDel.split('T',1)}</span></p>
                        
 
                            </div>
                           </div>
                        
                    </div>

                    <div className='row row-cols-7 mt-5 mx-auto boxdes2 flxspread frmshape'>
                        
                        <div className='col flex-column text-center p-0'><ContentPasteIcon /> <br></br>On Process</div>
                        {this.state.packaged == true ? <div className='col flex-row d-flex text-center p-0'><LinearScaleOutlinedIcon /><LinearScaleOutlinedIcon /></div> : <div className='col flex-column text-center p-0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>}
                        {this.state.packaged == true ? <div className='col flex-column text-center p-0'><ArchiveIcon /> <br></br>Packaged</div> : <div className='col flex-column text-center p-0 bgdk'><ArchiveIcon /> <br></br>Packaged</div>}
                        {this.state.fordelivery == true ? <div className='col flex-row d-flex text-center p-0'><LinearScaleOutlinedIcon /><LinearScaleOutlinedIcon /></div> : <div className='col flex-column text-center p-0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>}
                        {this.state.fordelivery == true ? <div className='col flex-column text-center p-0'><LocalShippingIcon /> <br></br>On Delivery</div> : <div className='col flex-column text-center p-0 bgdk'><LocalShippingIcon /> <br></br>On Delivery</div>}
                        {this.state.delivered == true ? <div className='col flex-row d-flex text-center p-0'><LinearScaleOutlinedIcon /><LinearScaleOutlinedIcon /></div> : <div className='col flex-column text-center p-0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>}
                        {this.state.delivered == true ? <div className='col flex-column text-center p-0'><VerifiedUserIcon /> <br></br>Delivered</div> : <div className='col flex-column text-center p-0 bgdk'><VerifiedUserIcon /> <br></br>Delivered</div>}
                    
                       
                        
                        </div>

                        <div className='row row-cols-1 row-cols-7 mt-5 mx-auto boxdes3 flxspread frmshape mb-5'>
                            {this.showDeliveryStat()}
                        </div>

                        
                        {this.state.reviewDone=='Done' ? <div className='row row-cols-1 row-cols-md-7 d-flex justify-content-center flex-column mx-auto mb-5'><div className='col col-md-12 bdfont'>
                        <p>You Have Already Reviewed For This Product. We Have Considered The Review Sincerely !!!</p>
                    </div></div> : this.state.delivered == true ? <div className='row row-cols-1 row-cols-md-7 d-flex justify-content-center flex-column mx-auto mb-5'>
                        <div className='col col-md-12 bdfont'>
                            <p>Insert Your Review ... </p>
                        </div>
                        <div className='col col-md-12'>
                            <textarea id='txtbox' className='textardes frmshape' onChange={(e)=>{this.setState({comment : e.target.value})}} type="text" placeholder='Before Review Make Sure To Use The Product For Good Amount Of Time.'></textarea>
                        </div>
                        <div className='col col-md-12 mb-2'>
                        <StarRatings
                        rating={this.state.rating}
                        starRatedColor="cyan"
                        changeRating={this.changeRating}
                        numberOfStars={6}
                        name='rating'
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        />
                        </div>
                        <div className='col col-md-12'>
                            <ThumbUpIcon onClick={(e)=>{this.makelike(e)}}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ThumbDownIcon onClick={(e)=>{this.makedislike(e)}}/>
                        </div>
                        <div className='col col-md-12 mx-auto mt-3'>
                        <button onClick={(e)=>{this.getreview(e)}} className="btn btn-sm btn-outline-info bdfont" type="button">Submit Review</button>
                        </div>


                    </div> : null}
                    <SweetAlert2 {...this.state.swal} />


                    {this.state.reportDone=='Done' ? <div className='row row-cols-1 row-cols-md-7 d-flex justify-content-center flex-column mx-auto mb-5'><div className='col col-md-12 bdfont'>
                        <p>You Have Already Reported This Product. We Have Considered The Report Sincerely !!!</p>
                    </div></div> : this.state.delivered == true && this.state.withinTime == true ? <div className='row row-cols-1 row-cols-md-7 d-flex justify-content-center flex-column mx-auto mb-5'>
                        <div className='col col-md-12 bdfont'>
                            <p>You Can Report The Product Within 7 Days After Buying ... </p>
                        </div>
                        
                        <div className='col col-md-12 mx-auto mt-3 d-flex justify-content-center'>
                        <button onClick={(e)=>{this.getreport(e)}} className="btn btn-sm btn-outline-info mx-auto bdfont" type="button"><ReportProblemIcon />Report</button>
                        </div>


                    </div> : null}

                    <SweetAlert2 {...this.state.swal2} />


                    
                </div>
            </Fragment>
        )
    }
}

export default SpecificDelivery
