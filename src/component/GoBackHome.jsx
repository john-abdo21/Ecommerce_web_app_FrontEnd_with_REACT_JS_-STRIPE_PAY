import React, { Component, Fragment } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";
import axios from 'axios';    


export class GoBackHome extends Component {
  render() {
    return (
        <Fragment>
            <div  className='container-fluid gobakhome d-flex justify-content-center alertshadw pt-5'>
                <div className='row row-cols-1 row-cols-md-7 mt-5'>  
                    <div className='col col-md-12 d-flex align-items-center mt-5 flex-column'>
                        <h3 className='text-center mb-5 headfont'>Your Purchase Was Successfully Done ...... Thanks For Chosing Us For Your Purchase.</h3>
                        <button className="btn btn-sm btn-outline-info" type="button"><Link className='txtdc bdfont' to='/'><ArrowBackIcon /> Go Back Home</Link></button>
                    </div>
                    
                </div>
            </div>
        </Fragment>
    )
  }
}

export default GoBackHome
