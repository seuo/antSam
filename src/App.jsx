import React, {Component} from 'react';
import axios from 'axios';
import {Router, Link, navigate} from '@reach/router';
import ProductListings from './ProductListings';
import Products from './Products';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Login from './Login';
import UserProfile from './UserProfile';
import UserProducts from './UserProducts';
import Product from './Product';
import PurchaseProductDetail from './PurchaseProductDetail';
import RouteProductDetails from './RouteProductDetails';
import PurchaseProductListings from './PurchaseProductListings';
import RouteCat from './RouteCategory';
import RouteThanks from './RouteThanks';

import {
  Accordion,
  Card,
  Button,
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Image,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import './App.css';
import Modal from 'react-awesome-modal';
import 'react-multi-carousel/lib/styles.css';
import './App.scss';
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

      <Modal
          visible={this.state.visible}
          width="95%"
          height="80%"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}>
          <div className="loginModal">

              <span>
                  <h6>Login or Register to buy & sell</h6>
                  <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                      <i className="far fa-window-close"></i>
                  </a>
              </span>
          <Login closeModal={this.closeModal} updateCurrentUser={this.updateCurrentUser}/>

          </div>
      </Modal>

      <div className="Header">
      {/* {
    currentUser? (<span>Welcome {currentUser.name}</span>) : null
  } */}
          <Navbar
              className="Navbar"
              collapseOnSelect="collapseOnSelect"
              expand="lg"
              bg="dark"
              variant="dark">
              <Link to="/"><Image className="Logo" src={require('./logo.png')} fluid="fluid"/></Link>
              <div className="navBarbot">
                  <InputGroup className="searchBar">
                      <InputGroup.Append>
                          <Button variant="outline-secondary">
                              <i className="fas fa-search"></i>
                          </Button>
                      </InputGroup.Append>
                      <FormControl
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="basic-addon2"/>
                       </InputGroup>

                       {
                           
                           this.state.currentUser ?  null
                        :
                       <><input
                            className="loginButton"
                            type="button"
                            value="Login"
                            onClick={() => this.openModal()}/>
                       
                        </>}

                     
                      {
                          this.state.currentUser ? (
                          <>
                          
                          <Navbar.Toggle className="userControl" aria-controls="responsive-navbar-nav"> 
                          <Image className="navbar-default"src={server+this.state.currentUser.photo} thumbnail={true} />
                          </Navbar.Toggle>

                          <Navbar.Collapse id="responsive-navbar-nav">
                              <Nav className="mr-auto">
                                  <Nav.Link href="/products/new">+ Sell an Item</Nav.Link>
                              <Nav.Link href="/user-profile">User Profile</Nav.Link>
                              <Nav.Link href="/products">My Products</Nav.Link>
                              <Nav.Link href="#watchlist">Watch List</Nav.Link>
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
              </div>
          </Navbar>
      </div>
      <div className="section">

          <div className="catagories">
              <Accordion className="FilterCat">
                  <Card>
                      <Card.Header>
                          <Accordion.Toggle as={Card.Header} eventKey="0">
                              <h5>BROWSE</h5>
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
            <Products path="/products"/>
          </Router>
 
          </div>
          <div className="footer">
                <Container>
                <Row>
                    <Col>Copyright 2019 threads</Col>
                </Row>
                </Container>
          </div>
        </div>
    );
  }
}

export default App;
