import React, {Component} from 'react';
import {Link, navigate} from '@reach/router';
import {Image, Col, Container, Row, Jumbotron, Card, Nav, Button, ListGroup} from 'react-bootstrap';

class RouteOurStore extends Component{
  constructor(props){
    super(props);
  }


  render(){

    return(
        <Container className="NoPad">
            <Row className="container">
                <h3>Our Store</h3>
                <p> We stock a huge range of new & second hand trade in's. We check the listing matches
                  the product for quality assurance, verify and then list.
                </p>
                <p>Duis elit nunc, congue sit amet porta sed, faucibus id massa. Aliquam consequat faucibus odio, vel sagittis neque dictum sed. Curabitur ut finibus eros, ac tempor sapien.
                </p>
            </Row>
        
            {/* <Container className="imageGrid">
                <Row>
                    <Col><Image src="/accessories.jpg" fluid="fluid"/></Col>
                    <Col><Image src="/suits.jpg" fluid="fluid"/><Image src="/footwear.jpg" fluid="fluid"/></Col>
                </Row>
            </Container> */}
        </Container>
    );
  }
}

export default RouteOurStore;
