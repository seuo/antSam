import React, {Component} from 'react';
import axios from 'axios';

import ProductListings from './ProductListings';
import Products from './Products';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Login from './Login';
import UserProfile from './UserProfile';
import UserProducts from './UserProducts';
import RouteProductDetails from './RouteProductDetails';
import PurchaseProductListings from './PurchaseProductListings';
import RouteCat from './RouteCategory';
import RouteThanks from './RouteThanks';
import RouteFeaturedProduct from './RouteFeaturedProduct';
import Footer from './Footer';

import {
  Accordion,Nav,Navbar,Container,Card,Image,Row,NavDropdown
} from 'react-bootstrap';
import './App.css';
import Modal from 'react-awesome-modal';
import {Router, Link, navigate, createMemorySource, createHistory} from '@reach/router';
import 'react-multi-carousel/lib/styles.css';
import { FiChevronDown,FiChevronLeft  } from "react-icons/fi";
import { IoIosArrowRoundBack,IoIosClose,IoIosAdd } from "react-icons/io";
import {api,server} from './API';





class App extends Component{
  constructor(props){
  super(props)
    this.state = {
      visible: false,
      currentUser:null,
      categories: [],
    }
  }

openModal = () => {
    this.setState({visible: true});
}

closeModal = () => {
    this.setState({visible: false});
}

handleLogOut=()=>{
    localStorage.removeItem('userID')
    this.setState({currentUser:null})
}
updateCurrentUser=(user)=>{
    this.setState({currentUser:user})
}

goHome = (e) => {
    e.preventDefault();
    navigate("/")
}

goBack = (e) => {
    e.preventDefault();
    window.history.back()
}

componentDidMount=()=>
{

    var userLocal = localStorage.getItem('userID')
    
    if(userLocal){
        api.getUser(userLocal).then(res=>this.setState({currentUser:res.data}))
    }

    api.getCategories().then(res => this.setState({categories:res.data}))

}

  render(){
      var {categories} = this.state;
      
    return(


      <div className="wrap">

    <Container className="modalStyle">
        <Modal
            visible={this.state.visible}
            width="95%"
            height="80%"
            effect="fadeInUp"
            onClickAway={() => this.closeModal()}>
            <div className="loginModal">

                <span>
                    <h6>Login/Register to Buy & Sell</h6>
                    <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                    <IoIosClose/>
                    </a>
                </span>
            <Login closeModal={this.closeModal} updateCurrentUser={this.updateCurrentUser}/>

            </div>
        </Modal>
      </Container>

      <div className="Header">
          <Navbar
              className="Navbar"
              collapseOnSelect="collapseOnSelect"
              expand="lg"
              bg="dark"
              variant="dark">
              
              <Container className="navBarbot">  
              
              <Link to="/"><Image className="Logo" src={require('./logo.png')} fluid="fluid"/></Link>
                       {
                           
                           this.state.currentUser ?  null
                        :
                       <><input
                            className="loginButton"
                            type="button"
                            value="Login / Register"
                            onClick={() => this.openModal()}/>
                       
                        </>}

                     
                      {
                          this.state.currentUser ? (
                          <>
                          
                          <Navbar.Toggle className="userControl" aria-controls="responsive-navbar-nav"> 
                          <Image className="navbar-default"src={server+this.state.currentUser.photo} thumbnail={true} />
                          </Navbar.Toggle>

                          <Navbar.Collapse id="responsive-navbar-nav" >
                          
                              <Nav className="mr-auto" >
                              <Nav.Link href="/products/new"><IoIosAdd/> Sell an Item</Nav.Link>
                              <Nav.Link href="/user-profile">User Profile</Nav.Link>
                              <Nav.Link href="/products">My Products</Nav.Link>
                              {/* <Nav.Link href="#watchlist">Watch List</Nav.Link> */}
                              <Nav.Link href="/my-reviews">My Reviews</Nav.Link>
                              <Nav.Link href="/purchases">Purchase Products</Nav.Link>
                              <input
                            className="loginButton"
                            type="button"
                            value="Logout"
                            onClick={this.handleLogOut}/>
                              </Nav>
                            
                          </Navbar.Collapse>
                          </>
                          ) : null
                      }
              </Container>
          </Navbar>
      </div>
      <div className="section">

          <div className="catagories">
              <Accordion className="FilterCat">
                  
                  <Card>
                      <Card.Header>
                      <span onClick={this.goBack} className="backArrow" to="/"><FiChevronLeft/></span>
                          <Accordion.Toggle as={Card.Header} eventKey="0">
                          <h5>CATAGORIES</h5><FiChevronDown/>
                          </Accordion.Toggle>
                          
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Nav className="browseNav" variant="pills" defaultActiveKey="/home">
                            
                                {
                                    categories.map(categories =>  <Link className="browseNavButton" to={'/categories/'+categories.name}>{categories.name}</Link>)
                                }
                        </Nav>
                      </Accordion.Collapse>
                  </Card>
              </Accordion>
          </div>
          <Router>
            <ProductListings path="/"/>
            <RouteCat path="/categories/:id"/>
            { this.state.currentUser ?<UserProducts path="/products" user={this.state.currentUser}/> : null}
            { this.state.currentUser ?<AddProduct path="/products/new"user={this.state.currentUser}/> : null}
            { this.state.currentUser ?<EditProduct path="/products/:id/edit"/> : null}
            <RouteProductDetails path="/products/:id" user={this.state.currentUser}/>
            <PurchaseProductListings path="/purchases"/>
            <RouteThanks path="/thanks"/>
            { this.state.currentUser ? <PurchaseProductListings path="/purchases" user={this.state.currentUser} /> : null}
            { this.state.currentUser ? <UserProfile path="/user-profile" user={this.state.currentUser} updateCurrentUser={this.updateCurrentUser}/> : null}
            <RouteFeaturedProduct path="/featured"/>
            <Products path="/products"/>
          </Router>
 
          </div>
          <Footer/>
        </div>
    );
  }
}

export default App;
