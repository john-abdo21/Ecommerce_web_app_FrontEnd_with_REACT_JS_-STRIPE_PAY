import React, { Component, Fragment } from 'react'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import KeyIcon from '@mui/icons-material/Key';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";

import axios from 'axios';   

export class EvenManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            desc : '',
            image : null,
            enddate : null,
            resCondition : '',
            eventData : []
        }
    }
    

    resUserCond = ()=>{
        if(this.state.resCondition != ''){
            return  <div className='text-center headfont'>
                <p>{this.state.resCondition}</p>
            </div>
        }else{
            return  <div className='text-center headfont'>
                <h4>Make Sure To Add Information Carefully And Don't Leave Any Field Empty ...</h4>
            </div>
        }
    }

    regEvent = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('desc',this.state.desc);
        formData.append('image',this.state.image);
        formData.append('enddate',this.state.enddate);
        
       

        try{
            const response = await axios.post(`/regEvent/${localStorage.getItem('slno')}`, formData, {
                'headers' : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            
            
                
            if(response.data.message == 'Successfully Added!!!'){
                this.setState({
                    name : '',
                    desc : '',
                    image : null,
                    enddate : null
                    
                },()=>{
                    this.componentDidMount();
                });

                const inputFields = document.querySelectorAll('input[type="text"], input[type="date"], input[type="file"], textarea');

    // Loop through all the input fields and set their values to an empty string
                inputFields.forEach((input) => {
                    input.value = '';
                });

                
            }
            this.setState({resCondition : response.data.message});
            
        }catch(error){
            console.log(error)
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
              <p className="card-title"><CommentIcon /><span className='boldcardtxt fsize headfontres'> {perEvent.event}</span></p>
              <p className="card-text txtsize bdfontres"><div className="description-container"><span className='boldcardtxt'>Description :<br></br></span> {this.padDescription(perEvent.event_details)}</div><span className='boldcardtxt'>Time Left :</span> {perEvent.event_end.split("T",1)}</p>
              <Link to="#" onClick={(e)=>{this.delEvent(e, perEvent.slno)}} className="desbtn btn-primary bdfont"><DeleteIcon fontSize='small' /> Delete</Link>
            </div>
            </div>
            </div>
        })
    }

    delEvent = async (e, prodSl)=>{
        e.preventDefault();
        try{
            const response = await axios.get(`/delEvent/${localStorage.getItem('slno')}/${prodSl}`,{
                headers : {
                    'Content-Type' : 'application/json'
                }
            });
            if(response.data.message == 'Success'){
                this.setState({
                    delSuc : 'Deleted'
                },()=>{
                    this.componentDidMount();
                })
            }
        }catch(error){
            console.log(error)
        }
    }

    async componentDidMount(){
        window.$('[data-bs-toggle="tooltip"]').tooltip();
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
        <div className="container-fluid addEmp align-items-center flex-column">
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt'>
            <div className='col col-md-12 mb-5 alertshadw'>{this.resUserCond()}</div>
        </div>
        <form method="POST"  encType='multipart/form-data'>
            <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt regformwidth'>
                <div className='col col-md-10 mb-2'><input onChange={(e)=>{this.setState({name : e.target.value})}} autocomplete="off" className="form-control form-control-sm frmshape" type="text" placeholder="Event Name" aria-label=".form-control-sm example" /></div>
                <div className='col col-md-10 mb-2'><textarea onChange={(e)=>{this.setState({desc : e.target.value})}} className="form-control form-control-sm txtboxwidhigh frmshape" type="text" placeholder="Event Description in short" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Event Detailed Description." aria-label=".form-control-sm example"></textarea></div>

                <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({image : e.target.files[0]})}} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Event Image In jpg or jpeg Here." className="form-control form-control-sm frmshape" id="formFileSm" type="file" /></div>
                <div className='col col-md-5 mb-2'><input onChange={(e)=>{this.setState({enddate : e.target.value})}} data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="custom-tooltip" data-bs-title="Insert Event Ending Date." autocomplete="off" className="form-control form-control-sm frmshape" type="date" placeholder="Date of Ending" aria-label=".form-control-sm example" /></div>
                

               
                
                
                <div className='col col-md-10 d-flex justify-content-center mt-3 mb-3'><button onClick={(e)=>{this.regEvent(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><AppRegistrationIcon /> Add Event</button></div>
            </div>
        </form>
        </div>

        <div className='container-fluid editEmp d-flex flex-column p-5'>
        <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center logintxt mb-0 p-0 align-items-center'>
            <div className='col col-md-12 mb-5 alertshadw d-flex justify-content-center headfont'><h4>All Events List :</h4></div>
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

export default EvenManage
