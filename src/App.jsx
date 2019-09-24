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
import RouteProductSearch from './RouteProductSearch';
import RouteOurStore from './RouteOurStore';
import UserNav from './UserNav';

import {
  Accordion,Nav,Navbar,Container,Card,Image,Row,NavDropdown,Popover,Button,ButtonToolbar,OverlayTrigger
} from 'react-bootstrap';
import './App.css';
import Modal from 'react-awesome-modal';
import {Router, Link, navigate, createMemorySource, createHistory} from '@reach/router';
import 'react-multi-carousel/lib/styles.css';
import { FiChevronDown,FiChevronLeft,FiSearch  } from "react-icons/fi";
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

      <div className="wrap" onClick={this.handleNavCollapse}>

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
                            <UserNav currentUser={this.state.currentUser}/>
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
                          <Link to="/search" ><FiSearch className="searchIcon"/></Link>
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
            <RouteProductSearch path="/search"/>
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
            <RouteOurStore path="/our-store"/>
          </Router>
 
          </div>
          <Footer/>
        </div>
    );
  }
}

export default App;
