import React, { Component, Fragment } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

export class LogoutPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resCondition : ''
        }
    }
    
    LogOut = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.get('/logmeout');
            if(response.data.message == 'Successfully Logged Out ...'){
                localStorage.clear();
                setTimeout(()=>{window.location.href = '/'},1500);
                setTimeout(()=>{window.location.reload()},2000);
            }
            this.setState({
                resCondition : response.data.message
            });

        }catch(error){
            console.log(error)
        }
    }

    rendCondition = ()=>{
        if(this.state.resCondition != ''){
            return  <div className='text-center headfont'><p>{this.state.resCondition}</p></div>
        }else{
            return  <div className='text-center headfont'><h5>You Sure Want To Logout ?<br></br>Once Logout All Unsaved Data Will Be Lost ...</h5></div>
        }
    }
    render() {
            return (
            <Fragment>
                <div className='container-fluid logout d-flex justify-content-center align-items-center'>
                    <div className='row row-cols-1 row-cols-md-12 d-flex justify-content-center'>
                        <div className='col col-md-12 d-flex justify-content-center flex-column'>
                            {this.rendCondition()}
                            <div className='col col-md-6 mx-auto d-flex justify-content-center mt-2 mb-3'><button onClick={(e)=>{this.LogOut(e)}} type="button" class="btn btn-sm btn-outline-info bdfont"><LogoutIcon /> logout</button></div>
                        </div>
                    </div>
                </div>
            </Fragment>
            )
    }
}

export default LogoutPage

