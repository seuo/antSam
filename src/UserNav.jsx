import React, {Component} from 'react';
import {
    Accordion,Nav,Navbar,Container,Card,Image,Row,NavDropdown,Popover,Button,ButtonToolbar,Dropdown
  } from 'react-bootstrap';
  import { IoIosArrowRoundBack,IoIosClose,IoIosAdd } from "react-icons/io";
  import {api,server} from './API';


class UserNav extends Component {
    constructor(props){
    super(props)
    this.state = {
    }
  }

    render(){

      return(
        <>
                            <Navbar.Toggle className="userControl" aria-controls="responsive-navbar-nav"> 
                            <Image className="navbar-default"src={server+this.props.currentUser.photo} thumbnail={true} />
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

      )
    }
}

export default UserNav;