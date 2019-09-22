import React, {Component} from 'react';
import RouteProductDetails from './RouteProductDetails';
import {Link, navigate} from '@reach/router';
import {api, server} from './API';
import {Card, Carousel, Button, ListGroup} from 'react-bootstrap';

import './App.css';

class Product extends Component{
  constructor(props){
    super(props);
  }
  // routeGetProduct = (id) => {
  //   api.getProduct(id).then(res => this.setState({product:res.data}))
  // }
  deleteProduct = () => {
    var {id, refreshData} = this.props;
    api.deleteProduct(id).then(() => refreshData())
  }


  render(){
    var {name, description, price, id, photos} = this.props;

    return(
      

      <div className="Item userItem">
      <Card
          style={{
              width: '18rem'
          }}>
          <Carousel interval={null}>
            {
              photos.map(photo=><Card.Img variant="top" src={server+photo}/>)
            }
          </Carousel>

          {/* <Card.Img variant="top" src={server+photo}/> */}

          <Card.Body>
              <Card.Title><Link to={'/products/'+id}>{name}</Link><Button variant="outline-dark">
                      <i className="far fa-heart"></i>
                  </Button>
              </Card.Title>
              <Card.Text></Card.Text>

              <ListGroup variant="flush">
                  <ListGroup.Item>
                      <span className="itemDescription">{description}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <span className="itemPrice">{price}</span>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="edit"><Link to={'/products/'+id+'/edit'}>Edit Listing</Link></ListGroup.Item>
                  <ListGroup.Item onClick={this.deleteProduct} className="delete linkColor">Remove Listing</ListGroup.Item>

              </ListGroup>

          </Card.Body>
      </Card>
    </div>
    );
  }
}

export default Product;
