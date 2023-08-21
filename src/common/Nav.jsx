import React, { Component, Fragment } from 'react'
import CategoryIcon from '@mui/icons-material/Category';
import AppleIcon from '@mui/icons-material/Apple';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'; 
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Face6Icon from '@mui/icons-material/Face6';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BadgeIcon from '@mui/icons-material/Badge';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ReportIcon from '@mui/icons-material/Report';
import VerifiedIcon from '@mui/icons-material/Verified';
import Face4Icon from '@mui/icons-material/Face4';
import MenuIcon from '@mui/icons-material/Menu';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';



import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
    } from "react-router-dom";
import axios from 'axios';    


export class Nav extends Component {
    constructor(){
        super();
        this.state = {
          isLoggedIn: false,
          email: '',
          image: '',
          role : '',
          prdType : [],
          prdBrand : [],
          amountincart : 0,
          searchData : ''
        }
        

    }

    async componentDidMount(){
      if (localStorage.getItem('token')) {
        
        try {
          const response2 = await axios.get('/getPrdTyp', {
            headers : {
              'Content-Type' : 'application/json'
            }
          });
          if(response2.data.message == 'Successful'){
            this.setState({
              prdType : response2.data.allType
            });
          }

          const response3 = await axios.get('/getPrdBrnd', {
            headers : {
              'Content-Type' : 'application/json'
            }
          });
          if(response3.data.message == 'Successful'){
            this.setState({
              prdBrand : response3.data.allBrand
            });
          }

          
          const response = await axios.get(`/navprofile/${localStorage.getItem('token')}`, {
            headers: {
              'Content-Type': 'application.json'
            }
          });
          if (response.data.message === 'Logged In.') {
            this.setState({
              isLoggedIn: true,
              email: response.data.email,
              image: response.data.image,
              role : response.data.role
            });
            
          }

          if(localStorage.getItem('role') != '' && localStorage.getItem('role') != 'Employee' && localStorage.getItem('role') != 'Seller'){
            const response6 = await axios.get(`/amountincart/${localStorage.getItem('slno')}`,{
              headers : {
                'Content-Type' : 'application/json'
              }
            });
            if(response6.data.message == 'Success'){
              this.setState({
                amountincart : response6.data.cartamount
              })
            }
          }
          

        } catch (error) {
          console.log(error);
        }
      }
    
    }

    showType=()=>{
      if(this.state.prdType.length>0){
        return  this.state.prdType.map((peritem)=>{
          return  <div className='text-center' key={peritem.slno}><li><Link className="dropdown-item bigtc bdfont" to={'/viewserverProductType/'+peritem.slno}>{peritem.type}</Link></li></div>
        })
      }
    }

    showBrand=()=>{
      if(this.state.prdBrand.length>0){
        return  this.state.prdBrand.map((peritem)=>{
          return  <div className='text-center' key={peritem.slno}><li><Link className="dropdown-item bigtc bdfont" to={'/viewserverProductBrand/'+peritem.slno}>{peritem.type}</Link></li></div>
        })
      }
    }

    renderNavProfileLink = ()=>{
      if(this.state.isLoggedIn){
        
        return  <h5 className="offcanvas-title sizepanelnav headfont" id="offcanvasNavbarLabel"><div className="row row-cols-12 ms-2"><div className="navuserimg col-4" style={{
          backgroundImage: `url("${this.state.image}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}></div> <div className='col-7'>{this.state.role == 'Seller' ? <Link className='changelinkdes' to='/sellerChangeProfile'>{this.state.email.length>23 ? this.state.email.split('@')[0].slice(0, 13)+'@gmail.com' : this.state.email.length<23 ? this.state.email.split('@')[0].padEnd(13, '*')+'@gmail.com' : null}</Link> : this.state.role == 'User' ? <Link className='changelinkdes' to='/userChangeProfile'>{this.state.email.length>23 ? this.state.email.split('@')[0].slice(0, 13)+'@gmail.com' : this.state.email.length<23 ? this.state.email.split('@')[0].padEnd(13, '*')+'@gmail.com' : null}</Link> : this.state.role == 'Employee' ? this.state.email : null }</div></div></h5>
        

      
      }else{
          return  <div><h5 className="offcanvas-title headfont" id="offcanvasNavbarLabel"><Face4Icon /> &nbsp;Please Log In</h5></div>
      }
    }

    

    render() {
        return (
            <Fragment>
            <nav className="navbar middarkbg sticky-top">
            <div className="container-fluid">
              <Link className="navbar-brand txtshad mx-auto headfont" to="/">EShopBD.com</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><MenuIcon color="cyan"/></span>
              </button>
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                  {this.renderNavProfileLink()}
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item mx-auto">
                      <Link className="nav-link active bigtc bdfont" aria-current="page" to="/"><HomeIcon /> &nbsp;Home</Link>
                    </li>
                    

                    {this.state.role == '' || this.state.role == 'User' ? <div><li className="nav-item dropdown text-center">
                    <Link className="nav-link dropdown-toggle bigtc bdfont" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <CategoryIcon/> &nbsp;Product Type
                    </Link>
                    <ul className="dropdown-menu">
                      {this.showType()}
                      
                      
                    </ul>
                  </li>
                  <li className="nav-item dropdown text-center">
                    <Link className="nav-link dropdown-toggle bigtc bdfont" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <AppleIcon /> &nbsp;Product Brands
                    </Link>
                    <ul className="dropdown-menu">
                      {this.showBrand()}
                      
                      
                    </ul>
                  </li></div> : null}
                    



                    {this.state.role == 'Seller'? <div className='text-center'><li className="nav-item">
                    <Link className="nav-link mx-auto bigtc bdfont" to="/addProduct"><InventoryIcon /> &nbsp;Add Selling Product</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc bdfont" to="/myProducts"><MenuBookIcon /> &nbsp;All My Products</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc bdfont" to="/allServerEvents"><EventNoteIcon /> &nbsp;All Active Events</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc bdfont" to="/allEventsProductAdd"><EditCalendarIcon /> &nbsp;Add Event Product</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc bdfont" to="/myEventProducts"><EventAvailableIcon /> &nbsp;My Event Products</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc bdfont" to="/allmycustomerorder"><LocalShippingIcon /> &nbsp;All Customer Orders</Link>
                  </li> </div> : null}
                    


                    {this.state.role == 'Employee' ? <div className='text-center bdfont'><li className="nav-item">
                    <Link className="nav-link mx-auto bigtc" to="/editEmp"><BadgeIcon /> &nbsp;Edit Employee</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc" to="/verfSellerAll"><AddReactionIcon /> &nbsp;Verify Sellers</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc" to="/productTypeAdd"><CategoryIcon /> &nbsp;Add Product Types</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc" to="/productBrandAdd"><AppleIcon /> &nbsp;Add Product Brands</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc" to="/eventManage"><EventNoteIcon /> &nbsp;Add / Remove Events</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto bigtc" to="/handleReports"><ReportIcon /> &nbsp;View Reports</Link>
                  </li> 
                  </div> : null}

                    


                    {this.state.role == 'User' ? <div className='bdfont'><li className="nav-item text-center">
                    <Link className="nav-link mx-auto bigtc" to="/seeAllCart"><AddShoppingCartIcon /> &nbsp;Cart <span className="badge badgerd text-bg-info">{this.state.amountincart}</span></Link>
                  </li>
                  <li className="nav-item text-center">
                  <Link className="nav-link mx-auto bigtc" to="/allconfirmedOrders"><LocalShippingIcon /> &nbsp;Confirm Orders</Link>
                  </li> </div> : null} 
                    
                    

                    {this.state.role == '' || this.state.role == 'User' ? <div className='bdfont'><li className='nav-item'>
                    <form className="d-flex mt-3" role="search">
                        <input onChange={(e)=>{this.setState({searchData : e.target.value})}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-sm btn-outline-info" type="button"><Link className='txtdc' to={'/searchDataPage/'+this.state.searchData}>Search</Link></button>
                    </form>
                </li></div> : null}
                    

                    {this.state.role == '' ? <div className='bdfont'><li className="nav-item text-center">
                    <Link className="nav-link mx-auto bigtc" to="/loginUser"><Face6Icon /> &nbsp;Login</Link>
                  </li>
                  <li className="nav-item text-center">
                  <Link className="nav-link mx-auto bigtc" to="/regUser"><HowToRegIcon /> &nbsp;Register</Link>
                  </li></div> : null }
                    
                    {this.state.role != '' ? <div className='bdfont'><li className="nav-item text-center">
                    <Link className="nav-link mx-auto bigtc" to="/logoutPage"><LogoutIcon /> &nbsp;Logout</Link>
                    </li> </div> : null}
                    

                    {this.state.role == '' ? <div className='bdfont'><li className="nav-item text-center">
                    <Link className="nav-link mx-auto bigtc" to="/verifyEmail"><VerifiedIcon /> &nbsp;Verify Email</Link>
                    </li></div> : null}
                     

                    {this.state.role == 'User' || this.state.role =='Seller' ? <div className='bdfont'><li className="nav-item text-center">
                    <Link className="nav-link mx-auto mt-5 bigtc" to="/reviewPage"><InfoIcon /> &nbsp;Review Us</Link>
                    </li> </div> : null}
                    
                  </ul>
                  
                  
                </div>
              </div>
            </div>
          </nav>                
            </Fragment>
        )
    }
}

export default withRouter(Nav)
