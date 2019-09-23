import React, {Component} from 'react';
import {Link, navigate} from '@reach/router';
import {Card,Container, Button,Col, ListGroup} from 'react-bootstrap';

class RouteThanks extends Component{
  constructor(props){
    super(props);
  }



  render(){


    return(
      <Container>
        <h1>Thank You</h1>
       <p>We'll get started on your order right away. <br></br>You should be receiving an order confirmation email shortly.</p>
       <p>If you have any questions call us on <br></br><b>0800 656 6565</b></p>
      </Container>



   
    );
  }
}

export default RouteThanks;
