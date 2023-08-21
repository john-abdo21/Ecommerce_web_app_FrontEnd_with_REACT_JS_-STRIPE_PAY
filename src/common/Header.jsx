import React, { Component,Fragment, Suspense } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    

import Nav from './Nav';
import Footer from '../component/Footer';

const LoginUser = React.lazy(()=>import('../component/LoginUser'));
const LoginSeller = React.lazy(()=>import('../component/LoginSeller'));
const LoginEmployee = React.lazy(()=>import('../component/LoginEmployee'));
const RegUser = React.lazy(()=>import('../component/RegUser'));
const RegSeller = React.lazy(()=>import('../component/RegSeller'));
const VerifyEmail = React.lazy(()=>import('../component/VerifyEmail'));
const EditEmp = React.lazy(()=>import('../component/EditEmp'));
const ChangeEmp = React.lazy(()=>import('../component/ChangeEmp'));
const ProductTypeAdd = React.lazy(()=>import('../component/ProductTypeAdd'));
const ProductBrandAdd = React.lazy(()=>import('../component/ProductBrandAdd'));
const MainVerfSeller = React.lazy(()=>import('../component/MainVerfSeller'));
const VerifySeller = React.lazy(()=>import('../component/VerifySeller'));
const AddProduct = React.lazy(()=>import('../component/AddProduct'));
const MyProduct = React.lazy(()=>import('../component/MyProduct'));
const ChangeProduct = React.lazy(()=>import('../component/ChangeProduct'));
const EvenManage = React.lazy(()=>import('../component/EvenManage'));
const ServerActiveEvents = React.lazy(()=>import('../component/ServerActiveEvents'));
const AllEventsProductAdd = React.lazy(()=>import('../component/AllEventsProductAdd'));
const MyEventProduct = React.lazy(()=>import('../component/MyEventProduct'));
const ChangeEventProduct = React.lazy(()=>import('../component/ChangeEventProduct'));
const SellerChangeProfile = React.lazy(()=>import('../component/SellerChangeProfile'));
const UserChangeProfile = React.lazy(()=>import('../component/UserChangeProfile'));
const Home = React.lazy(()=>import('../component/Home'));
const ViewTerms = React.lazy(()=>import('../component/ViewTerms'));
const ReviewPage = React.lazy(()=>import('../component/ReviewPage'));
const LogoutPage = React.lazy(()=>import('../component/LogoutPage'));
const ViewEventProd = React.lazy(()=>import('../component/ViewEventProd'));
const VeiwTypeProd = React.lazy(()=>import('../component/VeiwTypeProd'));
const ViewBrandProd = React.lazy(()=>import('../component/ViewBrandProd'));
const NormalProductAdd = React.lazy(()=>import('../component/NormalProductAdd'));
const EventProductAdd = React.lazy(()=>import('../component/EventProductAdd'));
const SeeAllSearchPrd = React.lazy(()=>import('../component/SeeAllSearchPrd'));

const SeeAllCart = React.lazy(()=>import('../component/SeeAllCart'));
const GoBackHome = React.lazy(()=>import('../component/GoBackHome'));
const AllMyCusOrd = React.lazy(()=>import('../component/AllMyCusOrd'));
const AllConfirmedOrders = React.lazy(()=>import('../component/AllConfirmedOrders'));
const SpecificDelivery = React.lazy(()=>import('../component/SpecificDelivery'));
const HandleReports = React.lazy(()=>import('../component/HandleReports'));
const   ForgotPass = React.lazy(()=>import('../component/ForgotPass'));




export class Header extends Component {
    constructor(){
        super();
        this.state = {
            image : '',
            slno : '',
            role : ''
        }
    }
    
    BootstrapSpinnerLoader = ()=> {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div class="spinner-grow text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        );
    }

    async componentDidMount(){

        if(localStorage.getItem('slno')){
            try{
                const response = await axios.get(`/amilogged/${localStorage.getItem('token')}`,{
                    'headers' : {
                        'Content-Type' : 'application/json'
                    }
                });
                if(response.status === 200){
                    if(response.data.message == 'Yes'){
                        
                        this.setState({
                            image : localStorage.getItem('image'),
                            slno : localStorage.getItem('slno'),
                            role : localStorage.getItem('role')
                        
                        });
                        console.log(this.state)
                    }else if(response.data.message == 'No'){
                        
                        localStorage.clear();
                    }
                }
            }catch(error){
                console.log(error)
            }
            
        }

    }

    render() {


        return (
            <Router>
                <Fragment>
                    <Nav />

                    <Suspense fallback={this.BootstrapSpinnerLoader()}>
                        <switch>
                            <Route exact path='/' component={()=>(<Home componentId={1} />)} />
                            <Route exact path='/loginUser' component={()=>(<LoginUser />)} />
                            <Route exact path='/loginSeller' component={()=>(<LoginSeller />)} />
                            <Route exact path='/loginEmployee' component={()=>(<LoginEmployee />)} />
                            <Route exact path='/regUser' component={()=>(<RegUser />)} />
                            <Route exact path='/regSeller' component={()=>(<RegSeller/>)} />
                            <Route exact path='/verifyEmail' component={()=>(<VerifyEmail/>)} />
                            <Route exact path='/editEmp' component={()=>(<EditEmp />)} />
                            <Route exact path='/changeEmp/:empSlno' component={(props)=>(<ChangeEmp {...props}/>)} />
                            <Route exact path='/productTypeAdd' component={()=>(<ProductTypeAdd />)} />
                            <Route exact path='/productBrandAdd' component={()=>(<ProductBrandAdd />)} />
                            <Route exact path='/eventManage' component={()=>(<EvenManage />)} />
                            <Route exact path='/verfSellerAll' component={()=>(<MainVerfSeller />)} />
                            <Route exact path='/verfSeller/:sellerSln' component={(props)=>(<VerifySeller {...props}/>)} />
                            <Route exact path='/addProduct' component={()=>(<AddProduct componentId={8} />)} />
                            <Route exact path='/myProducts' component={()=>(<MyProduct  componentId={9} />)} />
                            <Route exact path='/myEventProducts' component={()=>(<MyEventProduct />)} />
                            <Route exact path='/changeProduct/:productSln' component={(props)=>(<ChangeProduct {...props}/>)} />
                            <Route exact path='/changeEventProduct/:productSln' component={(props)=>(<ChangeEventProduct {...props}/>)} />
                            <Route exact path='/allServerEvents' component={()=>(<ServerActiveEvents />)} />
                            <Route exact path='/allEventsProductAdd' component={()=>(<AllEventsProductAdd />)} />
                            <Route exact path='/sellerChangeProfile' component={()=>(<SellerChangeProfile />)} />
                            <Route exact path='/userChangeProfile' component={()=>(<UserChangeProfile />)} />

                            <Route exact path='/logoutPage' component={()=>(<LogoutPage />)} />
                            <Route exact path='/viewTerms' component={()=>(<ViewTerms />)} />
                            <Route exact path='/reviewPage' component={()=>(<ReviewPage role={this.state.role}/>)} />
                            <Route exact path='/viewserverProductEvents/:sln' component={(props)=>(<ViewEventProd  componentId={2}  {...props}/>)} />
                            <Route exact path='/viewserverProductType/:sln' component={(props)=>(<VeiwTypeProd  componentId={3}     {...props}/>)} /> 
                            <Route exact path='/viewserverProductBrand/:sln' component={(props)=>(<ViewBrandProd  componentId={4}   {...props}/>)} />
                            
                            
                            <Route exact path='/viewserverProduct/:sln' component={(props)=>(<NormalProductAdd {...props}/>)} />
                            <Route exact path='/viewserverEventProduct/:sln' component={(props)=>(<EventProductAdd {...props}/>)} />

                            <Route exact path='/searchDataPage/:sln' component={(props)=>(<SeeAllSearchPrd  componentId={5}     {...props}/>)} />
                            <Route exact path='/seeAllCart' component={()=>(<SeeAllCart componentId={6} />)}/>
                            <Route exact path='/successPage' component={()=>(<GoBackHome />)} />
                            <Route exact path='/allmycustomerorder' component={()=>(<AllMyCusOrd />)} />
                            <Route exact path='/allconfirmedOrders' component={()=>(<AllConfirmedOrders />)} />
                            <Route exact path='/checkDelivery/:slno' component={(props)=>(<SpecificDelivery componentId={7} {...props}/>)} />

                            <Route exact path='/handleReports' component={()=>(<HandleReports />)} />
                            <Route exact path='/forgotPass' component={()=>(<ForgotPass />)} />

                        </switch>
                    </Suspense>
                    <Footer />

                    

                </Fragment>
            </Router>
            
        )
    }
}

export default Header
