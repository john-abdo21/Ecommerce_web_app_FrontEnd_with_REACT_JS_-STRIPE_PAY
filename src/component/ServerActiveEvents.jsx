import React, { Component, Fragment } from 'react'

import CommentIcon from '@mui/icons-material/Comment';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';   

export class ServerActiveEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventData : []
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
    showEventData = ()=>{
        
        return  this.state.eventData.map((perEvent)=>{
            return   <div className='col mb-5 mincardbd mx-auto' key={perEvent.slno}>
            <div className="card cardanim bordandanim">
           
            <img src={perEvent.event_image} className='card-img-top cardImg'></img>
            
            <div className="card-body">
              <p className="card-title"><CommentIcon /><span className='boldcardtxt fsize'> {perEvent.event}</span></p>
              <p className="card-text txtsize"><div className="description-container"><span className='boldcardtxt'>Description :<br></br></span> {this.padDescription(perEvent.event_details)}</div><span className='boldcardtxt'>Time Left :</span> {perEvent.event_end.split("T",1)}</p>
              
            </div>
            </div>
            </div>
        })
    }
    async componentDidMount(){
        try{

            const response = await axios.get(`/eventData/${localStorage.getItem('slno')}`, {
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Successful'){
                this.setState({
                    eventData : response.data.eventData
                })
            }

            console.log(this.state.eventData)

        }catch(error){
            console.log(error)
        }
    }
  render() {
    return (
        <Fragment>
        <div className='container-fluid editEmp d-flex flex-column p-5'>
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
            <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center'>All Events List :</div>
        </div>
        {window.innerWidth>1300 ? <div className='row row-cols-1 row-cols-md-6 mt-5 justify-content-center'>

        {this.showEventData()}
    
    
        </div> : 
        <div className='row row-cols-1 row-cols-md-4 mt-5 justify-content-center'>


            {this.showEventData()}

        
        </div>}
        

        </div>
        </Fragment>
    )
  }
}

export default ServerActiveEvents
