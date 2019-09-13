import React, {Component} from 'react';
import axios from 'axios';
import {Router, Link, navigate} from '@reach/router';
import ProductListings from './ProductListings';
import Products from './Products';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Login from './Login';
import RouteCat from './RouteCategory'
import Product from './Product';
import RouteProductDetails from './RouteProductDetails';
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

import './App.css';
import {api} from './API';


class App extends Component{
  constructor(props){
  super(props)
    this.state = {
      visible: false,
      categories:[],
      currentUser:null,
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
componentDidMount=()=>{
    api.
    getCategories().then(res => this.setState({categories:res.data}))

    var userLocal = localStorage.getItem('userID')
    
    if(userLocal){
        api.getUser(userLocal).then(res=>this.setState({currentUser:res.data}))
    }
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
              <Link to="/home"><Image className="Logo" src={require('./logo.png')} fluid="fluid"/></Link>
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
                           this.state.currentUser ? <> <input
                            className="loginButton"
                            type="button"
                            value="Logout"
                            onClick={this.handleLogOut}/>
                        </>:
                       <><input
                            className="loginButton"
                            type="button"
                            value="Login"
                            onClick={() => this.openModal()}/>
                       
                        </>}
                     
                      {
                          this.state.currentUser ? (
                          <>
                          
                          <Navbar.Toggle className="userControl" aria-controls="responsive-navbar-nav"/>

                          <Navbar.Collapse id="responsive-navbar-nav">
                              <Nav className="mr-auto">
                                <Nav.Link href="/products/new">+ Sell an Item</Nav.Link>
                                <Nav.Link href="/user-profile">User Profile</Nav.Link>
                                <Nav.Link href="/products">My Products</Nav.Link>
                                <Nav.Link href="#watchlist">Watch List</Nav.Link>
                                <Nav.Link href="/my-reviews">My Reviews</Nav.Link>
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
                                categories.map(categories =>  <Link className="browseNavButton" to={'/categories/'+categories.id}>{categories.name}</Link>)
                            }
                          </Nav>
                      </Accordion.Collapse>
                  </Card>
              </Accordion>

          </div>
         
      
          <Router>
            <ProductListings path="/home"/>
            <Products path="/products"/>
            <AddProduct path="/products/new"/>
            <EditProduct path="/products/:id/edit"/>
            <RouteCat path="/categories/:id"/>
            {/* <RouteProductDetails path="/detail/:id"/> */}
            <RouteProductDetails path="/products/:id"/>
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
