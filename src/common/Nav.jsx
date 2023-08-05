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
          role : ''
        }
        

    }

    async componentDidMount(){
      if (localStorage.getItem('token')) {
        
        try {
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
        } catch (error) {
          console.log(error);
        }
      }
    
    }

    renderNavProfileLink = ()=>{
      if(this.state.isLoggedIn){
        
        return  <h5 className="offcanvas-title sizepanelnav" id="offcanvasNavbarLabel"><div className="row row-cols-12 ms-2"><div className="navuserimg col-4" style={{
          backgroundImage: `url("${this.state.image}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}></div> <div className='col-7'>{this.state.email}</div></div></h5>
        

      
      }else{
          return  <div><h5 className="offcanvas-title" id="offcanvasNavbarLabel"><Face4Icon /> &nbsp;Please Log In</h5></div>
      }
    }

    render() {
        return (
            <Fragment>
            <nav className="navbar middarkbg borderstylenav sticky-top">
            <div className="container-fluid">
              <Link className="navbar-brand txtshad mx-auto" to="/">EShopBD.com</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                  {this.renderNavProfileLink()}
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/"><HomeIcon /> &nbsp;Home</Link>
                    </li>
                    

                    {this.state.role == '' || this.state.role == 'User' ? <div><li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <CategoryIcon/> &nbsp;Product Type
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="#">Action</Link></li>
                      <li><Link className="dropdown-item" to="#">Another action</Link></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <AppleIcon /> &nbsp;Product Brands
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="#">Action</Link></li>
                      <li><Link className="dropdown-item" to="#">Another action</Link></li>
                      <li>
                        <hr className="dropdown-divider" />
                        <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                      </li>
                      
                    </ul>
                  </li></div> : null}
                    



                    {this.state.role == 'Seller'? <div><li className="nav-item">
                    <Link className="nav-link mx-auto" to="#"><InventoryIcon /> &nbsp;Add Selling Product</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link mx-auto" to="#"><MenuBookIcon /> &nbsp;All My Products</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto" to="#"><LocalShippingIcon /> &nbsp;All Customer Orders</Link>
                  </li> </div> : null}
                    


                    {this.state.role == 'Employee' ? <div><li className="nav-item">
                    <Link className="nav-link mx-auto" to="/editEmp"><BadgeIcon /> &nbsp;Edit Employee</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link mx-auto" to="/verfSellerAll"><AddReactionIcon /> &nbsp;Verify Sellers</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto" to="/productTypeAdd"><CategoryIcon /> &nbsp;Add Product Types</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto" to="/productBrandAdd"><AppleIcon /> &nbsp;Add Product Brands</Link>
                  </li> 
                  <li className="nav-item">
                  <Link className="nav-link mx-auto" to="#"><ReportIcon /> &nbsp;View Reports</Link>
                  </li> 
                  </div> : null}

                    


                    {this.state.role == 'User' ? <div><li className="nav-item">
                    <Link className="nav-link mx-auto" to="#"><AddShoppingCartIcon /> &nbsp;Cart</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link mx-auto" to="#"><LocalShippingIcon /> &nbsp;Confirm Orders</Link>
                  </li> </div> : null} 
                    
                    

                    {this.state.role == '' || this.state.role == 'User' ? <div><li className='nav-item'>
                    <form className="d-flex mt-3" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-info" type="submit">Search</button>
                    </form>
                </li></div> : null}
                    

                    {this.state.role == '' ? <div><li className="nav-item">
                    <Link className="nav-link mx-auto" to="/loginUser"><Face6Icon /> &nbsp;Login</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link mx-auto" to="/regUser"><HowToRegIcon /> &nbsp;Register</Link>
                  </li></div> : null }
                    
                    {this.state.role != '' ? <div><li className="nav-item">
                    <Link className="nav-link mx-auto" to="#"><LogoutIcon /> &nbsp;Logout</Link>
                    </li> </div> : null}
                    

                    {this.state.role == '' ? <div><li className="nav-item">
                    <Link className="nav-link mx-auto" to="/verifyEmail"><VerifiedIcon /> &nbsp;Verify Email</Link>
                    </li></div> : null}
                     

                    <li className="nav-item">
                    <Link className="nav-link mx-auto mt-5" to="#"><InfoIcon /> &nbsp;Review Us</Link>
                    </li> 
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
